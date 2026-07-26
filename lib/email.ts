import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

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
  try {
    if (resend) {
      const { error } = await resend.emails.send({
        from: 'ABL Fashion Training Academy <onboarding@resend.dev>',
        to: data.email,
        subject: `Consultation Request Confirmation - ${data.referenceNumber}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #1a1a1a; font-size: 24px; margin: 0;">ABL Fashion</h1>
              <p style="color: #f97316; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin: 5px 0 0;">Training Academy</p>
            </div>

            <p style="color: #333; font-size: 16px; line-height: 1.6;">Dear ${data.name},</p>

            <p style="color: #333; font-size: 16px; line-height: 1.6;">
              Thank you for requesting a consultation with ABL Fashion Training Academy.
            </p>

            <div style="background: #faf8f3; border: 1px solid #e5e0d6; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <h3 style="color: #f97316; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 15px;">Consultation Details</h3>
              <p style="color: #333; font-size: 14px; line-height: 2; margin: 0;">
                <strong>Type:</strong> ${data.consultationType}<br>
                <strong>Preferred Date:</strong> ${data.preferredDate}<br>
                <strong>Preferred Time:</strong> ${data.preferredTime}
              </p>
            </div>

            <div style="background: #faf8f3; border: 1px solid #e5e0d6; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center;">
              <p style="color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 10px;">Your Request Reference Number</p>
              <p style="color: #f97316; font-size: 28px; font-weight: bold; letter-spacing: 2px; margin: 0;">${data.referenceNumber}</p>
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
    console.log(`Body: 
Dear ${data.name},

Thank you for requesting a consultation with ABL Fashion Training Academy.

Consultation Details:
- Type: ${data.consultationType}
- Preferred Date: ${data.preferredDate}
- Preferred Time: ${data.preferredTime}

Your request reference number is: ${data.referenceNumber}

Please save this reference number. You will need it for all future correspondence.

Our team will contact you shortly to confirm your appointment and discuss available time slots.

If you have any questions, please contact us:
- Phone: 0548883475 / 0544746709
- Email: ablfashion.training@gmail.com
- WhatsApp: https://wa.me/233548883475

Best regards,
ABL Fashion Training Academy
`);
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
  try {
    if (resend) {
      const { error } = await resend.emails.send({
        from: 'ABL Fashion Training Academy <onboarding@resend.dev>',
        to: data.email,
        subject: `Training Application Confirmation - ${data.referenceNumber}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #1a1a1a; font-size: 24px; margin: 0;">ABL Fashion</h1>
              <p style="color: #f97316; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin: 5px 0 0;">Training Academy</p>
            </div>

            <p style="color: #333; font-size: 16px; line-height: 1.6;">Dear ${data.name},</p>

            <p style="color: #333; font-size: 16px; line-height: 1.6;">
              Thank you for applying to the <strong>${data.trainingProgramme}</strong> programme at ABL Fashion Training Academy.
            </p>

            <div style="background: #faf8f3; border: 1px solid #e5e0d6; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center;">
              <p style="color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 10px;">Your Application Reference Number</p>
              <p style="color: #f97316; font-size: 28px; font-weight: bold; letter-spacing: 2px; margin: 0;">${data.referenceNumber}</p>
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
    console.log(`Body: 
Dear ${data.name},

Thank you for applying to the ${data.trainingProgramme} programme at ABL Fashion Training Academy.

Your application reference number is: ${data.referenceNumber}

Please save this reference number. You will need it for all future correspondence.

NEXT STEPS:
1. Visit our office at: Kasoa, Adam Nana Bus Stop, off Obom Road
2. Complete the official registration process
3. Make payment at the office

Our team will assist you with the registration and payment process.

If you have any questions, please contact us:
- Phone: 0548883475 / 0544746709
- Email: ablfashion.training@gmail.com
- WhatsApp: https://wa.me/233548883475

Best regards,
ABL Fashion Training Academy
`);
    console.log('=== END EMAIL ===');

    return { success: true };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error: 'Email sending failed' };
  }
}

