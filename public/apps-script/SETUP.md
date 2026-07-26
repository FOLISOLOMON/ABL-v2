# ABL Fashion — Google Sheets Setup Guide

## Files

- `public/apps-script/Code.gs` — The full Apps Script source.

## Setup Steps

1. **Create a Google Sheet** at `https://sheets.google.com`
   - Name it something like `ABL Fashion — Contact & Bookings`
   - Copy the spreadsheet ID from the URL:
     ```
     https://docs.google.com/spreadsheets/d/THIS_IS_THE_SHEET_ID/edit
     ```

2. **Open Apps Script**
   - Extensions → Apps Script
   - Delete any starter code
   - Paste the entire contents of `public/apps-script/Code.gs`

3. **Configure properties (optional but recommended)**
   - In the Apps Script editor: Project Settings (gear icon) → Script Properties
   - Add:
     - `SHEET_ID` = your spreadsheet ID from step 1
     - `TOKEN` = any random secret string (e.g., `abl-fashion-2026-secret`)
   - This pins the script to your specific sheet and adds basic auth

4. **Run initial setup**
   - Select `setupSheets` from the function dropdown
   - Click Run
   - Grant permissions when prompted
   - This creates the `contact_messages` and `bookings` tabs with headers

5. **Deploy as Web App**
   - Deploy → New deployment
   - Select type: Web app
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Click Deploy
   - Copy the web app URL (it looks like `https://script.google.com/macros/s/AKfycbx.../exec`)

6. **Update `.env`**
   - Paste the web app URL:
     ```
     GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
     ```
   - If you set a `TOKEN` property, also add it to `.env`:
     ```
     GOOGLE_SHEETS_TOKEN=abl-fashion-2026-secret
     ```

7. **Update `lib/google-sheets.ts` to send the token** (if you set one):
   - Add `token: process.env.GOOGLE_SHEETS_TOKEN` to the request body in `sendToSheet`

## Sheet Structure Created by setupSheets()

### contact_messages
`timestamp | name | phone | email | subject | message | status`

### bookings
`timestamp | name | phone | whatsapp | email | outfit_type | gender | occasion | preferred_date | description | status`

## Security Note

The web app is set to "Anyone" because form submissions come from unauthenticated users.
The optional `TOKEN` property adds a shared secret check so only requests from your site
(which knows the token) are accepted. Without the token, anyone who finds the URL could
POST to your sheet.

If you add token auth, update `lib/google-sheets.ts` to include it:
```typescript
body: JSON.stringify({ type, data, token: process.env.GOOGLE_SHEETS_TOKEN }),
```
