export async function sendToSheet(
  type: 'contact' | 'booking' | 'training' | 'consultation',
  data: Record<string, string>
) {
  const url = process.env.GOOGLE_APPS_SCRIPT_URL;

  if (!url) {
    throw new Error('GOOGLE_APPS_SCRIPT_URL is not configured');
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ type, data }),
  });

  if (!response.ok) {
    const result = await response.json().catch(() => ({}));
    throw new Error(result.error || `HTTP ${response.status}`);
  }

  return response.json();
}

export function isGoogleSheetsConfigured(): boolean {
  return !!process.env.GOOGLE_APPS_SCRIPT_URL;
}
