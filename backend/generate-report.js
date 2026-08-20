const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const ROLL_NUMBER = '24DCE149';
const SET_NAME = 'SET B';
const SUBJECT = 'Library Book Management System';
const PDF_NAME = `${ROLL_NUMBER}_SetB_Report.pdf`;

const pdfPath = path.resolve(__dirname, `../${PDF_NAME}`);
const doc = new PDFDocument({ margin: 50, size: 'A4' });

console.log(`Generating report PDF at: ${pdfPath}`);

const stream = fs.createWriteStream(pdfPath);
doc.pipe(stream);

// Add Header
doc.fontSize(22).fillColor('#4f46e5').text('University Practical Examination Report', { align: 'center' });
doc.fontSize(14).fillColor('#0f172a').text(`Subject: ${SUBJECT} (${SET_NAME})`, { align: 'center' });
doc.moveDown(0.5);

doc.fontSize(11).fillColor('#64748b').text(`Roll Number: ${ROLL_NUMBER}  |  Batch: B  |  Date: August 20, 2026`, { align: 'center' });
doc.moveDown(1.5);

// Draw separator line
doc.moveTo(50, doc.y).lineTo(545, doc.y).strokeColor('#e2e8f0').lineWidth(1).stroke();
doc.moveDown(1.5);

// Function to add screenshot section
function addScreenshotSection(title, filename, description) {
  doc.fontSize(14).fillColor('#4f46e5').text(title, { underline: true });
  doc.fontSize(10).fillColor('#0f172a').text(description);
  doc.moveDown(0.5);

  const imgPath = path.resolve(__dirname, `../${filename}`);
  if (fs.existsSync(imgPath)) {
    try {
      doc.image(imgPath, {
        fit: [495, 280],
        align: 'center',
        valign: 'center'
      });
      console.log(`✓ Embedded ${filename} successfully.`);
    } catch (err) {
      console.error(`✕ Error embedding ${filename}:`, err.message);
      doc.rect(50, doc.y, 495, 200).fillColor('#f8fafc').strokeColor('#ef4444').lineWidth(1).fillAndStroke();
      doc.fontSize(10).fillColor('#ef4444').text(`Error loading ${filename}: ${err.message}`, 60, doc.y - 110, { width: 475 });
    }
  } else {
    // Render placeholder box
    const startY = doc.y;
    doc.rect(50, startY, 495, 180).fillColor('#f1f5f9').strokeColor('#cbd5e1').lineWidth(1).fillAndStroke();
    doc.fillColor('#64748b').fontSize(11);
    doc.text(`[Screenshot Placeholder: ${filename}]`, 60, startY + 60, { align: 'center', width: 475 });
    doc.fontSize(9);
    doc.text(`Instructions: Take a screenshot of the system showing the ${title.toLowerCase()}, save it as '${filename}' in the root directory, and re-run "npm run report" in the backend folder.`, 70, startY + 90, { align: 'center', width: 455 });
    console.log(`⚠ Placeholder created for missing screenshot: ${filename}`);
  }
  
  // Set current y back for next items
  doc.y = doc.y + 120;
  doc.moveDown(2);
}

// Section 1: React Application
addScreenshotSection(
  'Screenshot 1 — React Application',
  'screenshot1.png',
  'Shows the Library Book Management System React application running locally in the browser (port 5173), featuring dynamic books rendering from the API.'
);

doc.addPage();

// Section 2: REST API
addScreenshotSection(
  'Screenshot 2 — REST API',
  'screenshot2.png',
  'Shows a successful GET /api/v1/books request response containing JSON catalog details, tested using Postman / Thunder Client.'
);

// Section 3: MongoDB
addScreenshotSection(
  'Screenshot 3 — MongoDB',
  'screenshot3.png',
  'Shows MongoDB Compass or MongoDB Atlas reflecting the seeded Book and Member collections and a successfully saved Borrowing record.'
);

// Footer notes
doc.moveTo(50, 750).lineTo(545, 750).strokeColor('#e2e8f0').lineWidth(1).stroke();
doc.fontSize(9).fillColor('#94a3b8').text(`Student Roll Number: ${ROLL_NUMBER}  |  Vite + React + Express.js + Mongoose + MongoDB`, 50, 760, { align: 'center' });

doc.end();

stream.on('finish', () => {
  console.log(`✓ Report PDF generated successfully at: ${pdfPath}`);
});
