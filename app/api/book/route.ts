import { NextResponse } from 'next/server';
import { sendToSheet } from '@/lib/google-sheets';
import { generateConsultationReference } from '@/lib/reference';
import { sendConsultationConfirmationEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      phone,
      whatsapp,
      email,
      consultationType,
      preferredDate,
      preferredTime,
      description,
    } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const referenceNumber = generateConsultationReference();

    await sendToSheet('consultation', {
      referenceNumber,
      name,
      phone,
      whatsapp: whatsapp || '',
      email: email || '',
      consultationType: consultationType || '',
      preferredDate: preferredDate || '',
      preferredTime: preferredTime || '',
      description: description || '',
      status: 'new',
    });

    let emailSent = false;
    if (email && email.trim()) {
      try {
        const emailResult = await sendConsultationConfirmationEmail({
          name,
          email: email.trim(),
          referenceNumber,
          consultationType: consultationType || 'General Consultation',
          preferredDate: preferredDate || '',
          preferredTime: preferredTime || '',
        });
        emailSent = emailResult.success;
      } catch (emailError) {
        console.error('Email sending failed (non-blocking):', emailError);
      }
    }

    return NextResponse.json({
      success: true,
      referenceNumber,
      emailSent,
    });
  } catch (error) {
    console.error('Booking API error:', error);
    return NextResponse.json(
      { error: 'Failed to submit booking' },
      { status: 500 }
    );
  }
}