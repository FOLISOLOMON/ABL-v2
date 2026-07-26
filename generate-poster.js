const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const FONTS_DIR = 'C:/Users/Solomon/.kilo/skills/canvas-design/canvas-fonts/';
const OUTPUT = 'C:/Users/Solomon/Desktop/ABL v2/.kilo/plans/hero-poster.pdf';

const doc = new PDFDocument({
  size: [1654, 2339],
  margins: { top: 0, bottom: 0, left: 0, right: 0 },
});

const stream = fs.createWriteStream(OUTPUT);
doc.pipe(stream);

const BLACK = '#0a0a0a';
const ORANGE = '#f97316';
const WHITE = '#f5f5f5';

doc.fillColor(BLACK).rect(0, 0, 1654, 2339, 'fill');

doc.fillColor('rgba(249,115,22,0.04)');
for (let x = 100; x < 1654; x += 120) {
  for (let y = 80; y < 2339; y += 120) {
    const r = Math.random() * 30 + 10;
    doc.circle(x, y, r).fill();
  }
}

doc.strokeColor('rgba(249,115,22,0.04)');
doc.lineWidth(0.5);
for (let i = 0; i < 50; i++) {
  const x1 = Math.random() * 1654;
  const y1 = Math.random() * 2339;
  const x2 = x1 + (Math.random() - 0.5) * 500;
  const y2 = y1 + (Math.random() - 0.5) * 500;
  doc.moveTo(x1, y1).lineTo(x2, y2).stroke();
}

doc.fillColor('rgba(249,115,22,0.03)');
doc.rect(150, 250, 1354, 1839, 'fill');

doc.fillColor('rgba(249,115,22,0.06)');
for (let i = 0; i < 8; i++) {
  const cx = 250 + Math.random() * 1154;
  const cy = 350 + Math.random() * 1639;
  const r = Math.random() * 180 + 60;
  doc.circle(cx, cy, r).fill();
}

doc.fillColor(ORANGE);
doc.opacity(0.1);
doc.circle(827, 1180, 380).fill();
doc.opacity(1);

doc.fillColor(ORANGE);
doc.opacity(0.05);
doc.circle(827, 1180, 220).fill();
doc.opacity(1);

doc.strokeColor(ORANGE);
doc.lineWidth(1.5);
doc.opacity(0.2);
doc.moveTo(827, 350).lineTo(827, 1180).stroke();
doc.moveTo(427, 1180).lineTo(1227, 1180).stroke();
doc.opacity(1);

doc.lineWidth(0.3);
doc.opacity(0.1);
for (let i = 0; i < 24; i++) {
  const angle = (Math.PI * 2 / 24) * i;
  const r = 160;
  doc.moveTo(827 + Math.cos(angle) * r, 1180 + Math.sin(angle) * r)
    .lineTo(827 + Math.cos(angle) * (r + 40), 1180 + Math.sin(angle) * (r + 40))
    .stroke();
}
doc.opacity(1);

doc.fillColor(ORANGE);
doc.rect(747, 600, 160, 5, 'fill');

doc.font(path.join(FONTS_DIR, 'Boldonse-Regular.ttf'));
doc.fillColor(WHITE);
doc.fontSize(20);
doc.y = 622;
doc.x = 827;
doc.text('ABL', { align: 'center' });

doc.font(path.join(FONTS_DIR, 'BricolageGrotesque-Regular.ttf'));
doc.fillColor(ORANGE);
doc.fontSize(10);
doc.y = 652;
doc.x = 827;
doc.text('F A S H I O N', { align: 'center', characterSpacing: 10 });

doc.font(path.join(FONTS_DIR, 'InstrumentSans-Regular.ttf'));
doc.fillColor('rgba(255,255,255,0.7)');
doc.fontSize(8);
doc.y = 712;
doc.x = 827;
doc.text('EST. 2016 - KASOA, GHANA', { align: 'center', characterSpacing: 5 });

doc.fillColor(ORANGE);
doc.opacity(0.4);
doc.rect(480, 770, 694, 0.5, 'fill');
doc.opacity(1);

doc.font(path.join(FONTS_DIR, 'BricolageGrotesque-Bold.ttf'));
doc.fillColor(WHITE);
doc.fontSize(44);
doc.y = 810;
doc.x = 827;
doc.text('WE SEW TO', { align: 'center' });

doc.font(path.join(FONTS_DIR, 'Boldonse-Regular.ttf'));
doc.fillColor(ORANGE);
doc.fontSize(52);
doc.y = 870;
doc.x = 827;
doc.text('MATCH', { align: 'center' });

doc.font(path.join(FONTS_DIR, 'BricolageGrotesque-Bold.ttf'));
doc.fillColor(WHITE);
doc.fontSize(44);
doc.y = 930;
doc.x = 827;
doc.text('YOUR STATUS.', { align: 'center' });

doc.font(path.join(FONTS_DIR, 'InstrumentSans-Regular.ttf'));
doc.fillColor('rgba(255,255,255,0.7)');
doc.fontSize(10);
doc.y = 1010;
doc.x = 827;
doc.text('Custom fashion, timeless craftsmanship', { align: 'center' });
doc.y = 1032;
doc.x = 827;
doc.text('and training to help you express your identity.', { align: 'center' });

doc.fillColor(ORANGE);
doc.opacity(0.35);
doc.rect(530, 1080, 594, 0.5, 'fill');
doc.opacity(1);

doc.fillColor(ORANGE);
doc.roundedRect(692, 1110, 270, 52, 26, 'fill');
doc.font(path.join(FONTS_DIR, 'BricolageGrotesque-Bold.ttf'));
doc.fillColor(BLACK);
doc.fontSize(9);
doc.y = 1120;
doc.x = 827;
doc.text('BOOK YOUR CUSTOM OUTFIT', { align: 'center', characterSpacing: 2 });

doc.strokeColor(WHITE);
doc.lineWidth(0.5);
doc.opacity(0.3);
doc.roundedRect(692, 1175, 250, 52, 26, 'stroke');
doc.opacity(1);

doc.font(path.join(FONTS_DIR, 'BricolageGrotesque-Bold.ttf'));
doc.fillColor(WHITE);
doc.fontSize(9);
doc.y = 1185;
doc.x = 827;
doc.text('EXPLORE THE LOOKBOOK', { align: 'center', characterSpacing: 2 });

doc.font(path.join(FONTS_DIR, 'InstrumentSans-Regular.ttf'));
doc.fillColor('rgba(255,255,255,0.25)');
doc.fontSize(7);
doc.y = 1250;
doc.x = 827;
doc.text('All designs quoted individually.', { align: 'center' });
doc.y = 1262;
doc.x = 827;
doc.text('Chat with us on WhatsApp for fast pricing.', { align: 'center' });

for (let i = 0; i < 14; i++) {
  const x = 180 + i * 115;
  doc.fillColor('rgba(249,115,22,0.1)');
  doc.circle(x, 1490, 3, 'fill');
}

doc.strokeColor(ORANGE);
doc.lineWidth(0.3);
doc.opacity(0.12);
doc.moveTo(120, 1510).lineTo(1534, 1510).stroke();
doc.moveTo(180, 1520).lineTo(1474, 1520).stroke();
doc.opacity(1);

doc.font(path.join(FONTS_DIR, 'InstrumentSans-Regular.ttf'));
doc.fillColor('rgba(255,255,255,0.18)');
doc.fontSize(7);
doc.y = 1536;
doc.x = 827;
doc.text('SCROLL TO EXPLORE', { align: 'center', characterSpacing: 7 });

doc.fillColor('rgba(255,255,255,0.15)');
doc.path().moveTo(815, 1575).lineTo(839, 1575).lineTo(827, 1593).close().fill();

doc.font(path.join(FONTS_DIR, 'InstrumentSans-Regular.ttf'));
doc.fillColor('rgba(255,255,255,0.1)');
doc.fontSize(6);
doc.y = 2180;
doc.x = 827;
doc.text('ABL FASHION - CUSTOM SEWING - KASOA, GHANA', { align: 'center', characterSpacing: 4 });

doc.font(path.join(FONTS_DIR, 'BricolageGrotesque-Regular.ttf'));
doc.fillColor('rgba(249,115,22,0.35)');
doc.fontSize(8);
doc.y = 2210;
doc.x = 827;
doc.text('www.ablfashion.gh', { align: 'center', characterSpacing: 3 });

doc.end();
