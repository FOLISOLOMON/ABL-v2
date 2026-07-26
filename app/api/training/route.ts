import { NextResponse } from 'next/server';
import { sendToSheet } from '@/lib/google-sheets';
import { generateTrainingReference } from '@/lib/reference';
import { sendTrainingConfirmationEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, trainingProgramme } = body;

    if (!name || !email || !phone || !trainingProgramme) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate unique reference number
    const referenceNumber = generateTrainingReference();

    // Save to Google Sheets
    await sendToSheet('training', {
      referenceNumber,
      name,
      email,
      phone,
      trainingProgramme,
      applicationStatus: 'Awaiting Office Visit',
      paymentStatus: 'Unpaid',
    });

    // Send confirmation email (non-blocking - don't fail if email fails)
    let emailSent = false;
    try {
      const emailResult = await sendTrainingConfirmationEmail({
        name,
        email,
        trainingProgramme,
        referenceNumber,
      });
      emailSent = emailResult.success;
    } catch (emailError) {
      console.error('Email sending failed (non-blocking):', emailError);
    }

    return NextResponse.json({
      success: true,
      referenceNumber,
      emailSent,
    });
  } catch (error) {
    console.error('Training API error:', error);
    return NextResponse.json(
      { error: 'Failed to submit training application' },
      { status: 500 }
    );
  }
}
