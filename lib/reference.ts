/**
 * Generate a unique reference number for training applications
 * Format: TRN-YYYY-XXXXX (e.g., TRN-2026-00001)
 */
export function generateTrainingReference(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 99999) + 1;
  const padded = String(random).padStart(5, '0');
  return `TRN-${year}-${padded}`;
}

/**
 * Generate a unique reference number for consultation bookings
 * Format: CONS-YYYY-XXXXX (e.g., CONS-2026-00001)
 */
export function generateConsultationReference(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 99999) + 1;
  const padded = String(random).padStart(5, '0');
  return `CONS-${year}-${padded}`;
}
