import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;
const fromAddress =
  process.env.RESEND_FROM_EMAIL || 'ABL Fashion <onboarding@resend.dev>';

function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

interface ConsultationConfirmationEmail {
  name: string;
  email: string;
  referenceNumber: string;
  consultationType: string;
  preferredDate: string;
  preferredTime: string;
}

export async function sendConsultationConfirmationEmail(
  data: ConsultationConfirmationEmail
): Promise<{ success: boolean; error?: string }> {
  if (!data.email || !data.email.trim()) {
    return { success: false, error: 'No recipient email provided' };
  }

  const safeName = escapeHtml(data.name);
  const safeType = escapeHtml(data.consultationType);
  const safeDate = escapeHtml(data.preferredDate || 'To be confirmed');
  const safeTime = escapeHtml(data.preferredTime || 'To be confirmed');
  const safeRef = escapeHtml(data.referenceNumber);

  try {
    if (resend) {
      const { error } = await resend.emails.send({
        from: fromAddress,
        to: data.email,
        subject: `Consultation Request Confirmation - ${data.referenceNumber}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #1a1a1a; font-size: 24px; margin: 0;">ABL Fashion</h1>
              <p style="color: #f97316; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin: 5px 0 0;">Custom Fashion &amp; Training</p>
            </div>

            <p style="color: #333; font-size: 16px; line-height: 1.6;">Dear ${safeName},</p>

            <p style="color: #333; font-size: 16px; line-height: 1.6;">
              Thank you for requesting a consultation with ABL Fashion.
            </p>

            <div style="background: #faf8f3; border: 1px solid #e5e0d6; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <h3 style="color: #f97316; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 15px;">Consultation Details</h3>
              <p style="color: #333; font-size: 14px; line-height: 2; margin: 0;">
                <strong>Type:</strong> ${safeType}<br>
                <strong>Preferred Date:</strong> ${safeDate}<br>
                <strong>Preferred Time:</strong> ${safeTime}
              </p>
            </div>

            <div style="background: #faf8f3; border: 1px solid #e5e0d6; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center;">
              <p style="color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 10px;">Your Request Reference Number</p>
              <p style="color: #f97316; font-size: 28px; font-weight: bold; letter-spacing: 2px; margin: 0;">${safeRef}</p>
            </div>

            <p style="color: #333; font-size: 16px; line-height: 1.6;">
              <strong>Please save this reference number.</strong> You will need it for all future correspondence.
            </p>

            <p style="color: #333; font-size: 16px; line-height: 1.6;">
              Our team will contact you shortly to confirm your appointment and discuss available time slots.
            </p>

            <div style="border-top: 1px solid #e5e0d6; padding-top: 20px; margin-top: 20px;">
              <p style="color: #666; font-size: 12px; line-height: 1.6; margin: 0;">
                <strong>Contact Us:</strong><br>
                Phone: 0548883475 / 0544746709<br>
                Email: ablfashion.training@gmail.com<br>
                WhatsApp: wa.me/233548883475
              </p>
            </div>

            <p style="color: #999; font-size: 11px; margin-top: 20px; text-align: center;">
              ABL Fashion / Training &bull; Kasoa, Ghana
            </p>
          </div>
        `,
      });

      if (error) {
        console.error('Resend API error:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    }

    // Fallback: log the email that would be sent
    console.log('=== CONSULTATION CONFIRMATION EMAIL ===');
    console.log(`To: ${data.email}`);
    console.log(`Subject: Consultation Request Confirmation - ${data.referenceNumber}`);
    console.log('=== END EMAIL ===');

    return { success: true };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error: 'Email sending failed' };
  }
}

interface TrainingConfirmationEmail {
  name: string;
  email: string;
  trainingProgramme: string;
  referenceNumber: string;
}

export async function sendTrainingConfirmationEmail(
  data: TrainingConfirmationEmail
): Promise<{ success: boolean; error?: string }> {
  if (!data.email || !data.email.trim()) {
    return { success: false, error: 'No recipient email provided' };
  }

  const safeName = escapeHtml(data.name);
  const safeProgramme = escapeHtml(data.trainingProgramme);
  const safeRef = escapeHtml(data.referenceNumber);

  try {
    if (resend) {
      const { error } = await resend.emails.send({
        from: fromAddress,
        to: data.email,
        subject: `Training Application Confirmation - ${data.referenceNumber}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #1a1a1a; font-size: 24px; margin: 0;">ABL Fashion</h1>
              <p style="color: #f97316; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin: 5px 0 0;">Training Academy</p>
            </div>

            <p style="color: #333; font-size: 16px; line-height: 1.6;">Dear ${safeName},</p>

            <p style="color: #333; font-size: 16px; line-height: 1.6;">
              Thank you for applying to the <strong>${safeProgramme}</strong> programme at ABL Fashion Training Academy.
            </p>

            <div style="background: #faf8f3; border: 1px solid #e5e0d6; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center;">
              <p style="color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 10px;">Your Application Reference Number</p>
              <p style="color: #f97316; font-size: 28px; font-weight: bold; letter-spacing: 2px; margin: 0;">${safeRef}</p>
            </div>

            <p style="color: #333; font-size: 16px; line-height: 1.6;">
              <strong>Please save this reference number.</strong> You will need it for all future correspondence.
            </p>

            <div style="background: #1a1a1a; color: white; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <h3 style="color: #f97316; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 15px;">Next Steps</h3>
              <ol style="color: #ccc; font-size: 14px; line-height: 2; padding-left: 20px; margin: 0;">
                <li>Visit our office at: <strong>Kasoa, Adam Nana Bus Stop, off Obom Road</strong></li>
                <li>Complete the official registration process</li>
                <li>Make payment at the office</li>
              </ol>
            </div>

            <p style="color: #666; font-size: 14px; line-height: 1.6;">
              Our team will assist you with the registration and payment process.
            </p>

            <div style="border-top: 1px solid #e5e0d6; padding-top: 20px; margin-top: 20px;">
              <p style="color: #666; font-size: 12px; line-height: 1.6; margin: 0;">
                <strong>Contact Us:</strong><br>
                Phone: 0548883475 / 0544746709<br>
                Email: ablfashion.training@gmail.com<br>
                WhatsApp: wa.me/233548883475
              </p>
            </div>

            <p style="color: #999; font-size: 11px; margin-top: 20px; text-align: center;">
              ABL Fashion / Training &bull; Kasoa, Ghana
            </p>
          </div>
        `,
      });

      if (error) {
        console.error('Resend API error:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    }

    // Fallback: log the email that would be sent
    console.log('=== TRAINING CONFIRMATION EMAIL ===');
    console.log(`To: ${data.email}`);
    console.log(`Subject: Training Application Confirmation - ${data.referenceNumber}`);
    console.log('=== END EMAIL ===');

    return { success: true };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error: 'Email sending failed' };
  }
}