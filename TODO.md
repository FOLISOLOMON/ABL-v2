# Training & Consultation Separation - Implementation Plan

## Phase 1: Google Sheets Integration (Apps Script)
- [x] Add TRAINING_HEADERS to Code.gs
- [x] Add training type handler to doPost()
- [x] Add consultation tracking (separate from bookings)

## Phase 2: Reference Number Utility
- [x] Create lib/reference.ts
- [x] Generate TRN-YYYY-XXXXX format
- [x] Generate CONS-YYYY-XXXXX format

## Phase 3: Email Utility
- [x] Create lib/email.ts
- [x] Send confirmation email after training application

## Phase 4: API Routes
- [x] Create app/api/training/route.ts
- [x] Handle training application submission
- [x] Generate reference number
- [x] Save to Google Sheets
- [x] Send confirmation email
- [x] Return reference number

## Phase 5: Training Application Form
- [x] Create app/training/apply/layout.tsx
- [x] Create app/training/apply/page.tsx
- [x] Build dedicated training form (not multi-step)
- [x] Success page with reference number + office visit instructions
- [x] CTA: "Apply for Training"

## Phase 6: Update Existing Pages
- [x] Update app/training/page.tsx - link to /training/apply
- [x] Update components/sections/training-preview.tsx - add Apply for Training button
- [x] Update app/book/page.tsx - consultation-specific labels and CTA
- [x] Update app/book/layout.tsx - update metadata
- [x] Update components/layout/navbar.tsx - update CTAs
- [x] Update components/sections/final-cta.tsx - update CTAs

## Phase 7: Google Sheets Library Update
- [x] Update lib/google-sheets.ts - add 'training' type support

## Phase 8: Resend SDK Integration
- [x] Install `resend` npm package
- [x] Refactor `lib/email.ts` to use Resend SDK (`import { Resend } from 'resend'`) instead of raw fetch
- [x] Create `.env.example` with `RESEND_API_KEY=re_xxxxxxxxx`
- [ ] Add `RESEND_API_KEY=re_xxxxxxxxx` to `.env.local` (replace with your real API key)

## Phase 9: Consultation Workflow Finalization
- [x] Update app/api/book/route.ts — use 'consultation' type and generate CONS reference
- [ ] Add consultation type and preferred time fields to book form
- [ ] Update book page CTA — "Request Consultation" → "Book a Consultation"
- [x] Add sendConsultationConfirmationEmail to lib/email.ts
- [ ] Fix Google Sheets type mismatch (booking → consultation)

## Phase 10: Admin Workflow (via Google Sheets + Apps Script)
- [ ] Admin updates application status and payment status directly in Google Sheets
- [ ] Staff use reference number, name, or email to find applications in Sheets

