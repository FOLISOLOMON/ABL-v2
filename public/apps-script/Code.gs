// ABL Fashion — Google Sheets Auto-Setup + Form Handler
//
// Setup:
// 1. Create a new Google Sheet (or open an existing one).
// 2. Extensions → Apps Script → paste this entire file.
// 3. Run `setupSheets()` once from the Apps Script editor (it will ask for permissions).
//    This creates the two tabs with headers automatically.
// 4. Deploy → New deployment → Web app.
//    - Execute as: Me
//    - Who has access: Anyone
// 5. Copy the web app URL into .env as GOOGLE_APPS_SCRIPT_URL.
//
// Optional: set SHEET_ID in Apps Script Properties to target a specific spreadsheet
// by ID instead of the active one.

const SHEET_ID = PropertiesService.getScriptProperties().getProperty('SHEET_ID');

const CONTACT_HEADERS = [
  'timestamp',
  'name',
  'phone',
  'email',
  'subject',
  'message',
  'status',
];

const BOOKING_HEADERS = [
  'timestamp',
  'name',
  'phone',
  'whatsapp',
  'email',
  'outfit_type',
  'gender',
  'occasion',
  'preferred_date',
  'description',
  'status',
];

const TRAINING_HEADERS = [
  'timestamp',
  'reference_number',
  'name',
  'email',
  'phone',
  'training_programme',
  'application_status',
  'payment_status',
  'created_date',
];

const CONSULTATION_HEADERS = [
  'timestamp',
  'reference_number',
  'name',
  'email',
  'phone',
  'consultation_type',
  'preferred_date',
  'preferred_time',
  'description',
  'status',
];

const TOKEN = PropertiesService.getScriptProperties().getProperty('TOKEN') || '';

function getSpreadsheet() {
  if (SHEET_ID) {
    return SpreadsheetApp.openById(SHEET_ID);
  }
  return SpreadsheetApp.getActiveSpreadsheet();
}

function ensureTab(sheet, name, headers) {
  let tab = sheet.getSheetByName(name);
  if (!tab) {
    tab = sheet.insertSheet(name);
  }
  const firstRow = tab.getRange(1, 1, 1, headers.length).getValues()[0];
  const needsHeaders = headers.some((header, index) => firstRow[index] !== header);
  if (needsHeaders) {
    tab.getRange(1, 1, 1, headers.length).setValues([headers]);
    tab.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  }
  return tab;
}

function setupSheets() {
  const sheet = getSpreadsheet();
  ensureTab(sheet, 'contact_messages', CONTACT_HEADERS);
  ensureTab(sheet, 'bookings', BOOKING_HEADERS);
  ensureTab(sheet, 'training_applications', TRAINING_HEADERS);
  ensureTab(sheet, 'consultations', CONSULTATION_HEADERS);
}

function isAuthorized(e) {
  if (!TOKEN) return true;
  const body = JSON.parse(e.postData.contents);
  return body.token === TOKEN;
}

function doPost(e) {
  try {
    if (!isAuthorized(e)) {
      return ContentService.createTextOutput(
        JSON.stringify({ error: 'Unauthorized' })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    const body = JSON.parse(e.postData.contents);
    const sheet = getSpreadsheet();

    if (body.type === 'contact') {
      const tab = ensureTab(sheet, 'contact_messages', CONTACT_HEADERS);
      tab.appendRow([
        new Date(),
        body.data.name || '',
        body.data.phone || '',
        body.data.email || '',
        body.data.subject || '',
        body.data.message || '',
        body.data.status || 'new',
      ]);
    } else if (body.type === 'booking') {
      const tab = ensureTab(sheet, 'bookings', BOOKING_HEADERS);
      tab.appendRow([
        new Date(),
        body.data.name || '',
        body.data.phone || '',
        body.data.whatsapp || '',
        body.data.email || '',
        body.data.outfitType || '',
        body.data.gender || '',
        body.data.occasion || '',
        body.data.preferredDate || '',
        body.data.description || '',
        body.data.status || 'new',
      ]);
    } else if (body.type === 'training') {
      const tab = ensureTab(sheet, 'training_applications', TRAINING_HEADERS);
      tab.appendRow([
        new Date(),
        body.data.referenceNumber || '',
        body.data.name || '',
        body.data.email || '',
        body.data.phone || '',
        body.data.trainingProgramme || '',
        body.data.applicationStatus || 'Awaiting Office Visit',
        body.data.paymentStatus || 'Unpaid',
        new Date(),
      ]);
    } else if (body.type === 'consultation') {
      const tab = ensureTab(sheet, 'consultations', CONSULTATION_HEADERS);
      tab.appendRow([
        new Date(),
        body.data.referenceNumber || '',
        body.data.name || '',
        body.data.email || '',
        body.data.phone || '',
        body.data.consultationType || '',
        body.data.preferredDate || '',
        body.data.preferredTime || '',
        body.data.description || '',
        body.data.status || 'new',
      ]);
    } else {
      return ContentService.createTextOutput(
        JSON.stringify({ error: 'Unknown type: ' + body.type })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService.createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({ status: 'ok', message: 'ABL Fashion Sheets API is running' })
  ).setMimeType(ContentService.MimeType.JSON);
}
