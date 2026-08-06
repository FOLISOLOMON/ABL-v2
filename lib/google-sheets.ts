export async function sendToSheet(
  type: 'contact' | 'booking' | 'training' | 'consultation',
  data: Record<string, string>,
  retries = 3,
  backoff = 500
) {
  const url = process.env.GOOGLE_APPS_SCRIPT_URL;

  if (!url) {
    throw new Error('GOOGLE_APPS_SCRIPT_URL is not configured');
  }

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type, data }),
      });

      if (!response.ok) {
        let result: { error?: string } = {};
        try {
          result = (await response.json()) as { error?: string };
        } catch {
          // ignore parse error
        }

        const message = result.error || `HTTP ${response.status}`;
        throw new Error(
          `${message} — check GOOGLE_APPS_SCRIPT_URL (${url}) and ensure the Apps Script is deployed as a Web App with "Anyone" access.`
        );
      }

      return response.json();
    } catch (error) {
      const err = error as NodeJS.ErrnoException & { url?: string };
      const isRetryable =
        error instanceof TypeError ||
        err?.code === 'ECONNRESET' ||
        err?.code === 'ETIMEDOUT' ||
        err?.code === 'ENOTFOUND' ||
        err?.code === 'ECONNREFUSED';

      if (!isRetryable || attempt >= retries) {
        throw error;
      }

      await new Promise((resolve) => setTimeout(resolve, backoff * attempt));
    }
  }

  throw new Error('Failed to send to Google Sheets after retries');
}

export function isGoogleSheetsConfigured(): boolean {
  return !!process.env.GOOGLE_APPS_SCRIPT_URL;
}
