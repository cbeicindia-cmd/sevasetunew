const PDFDocument = require('pdfkit');

function generateAgentReceipt(data) {
  const doc = new PDFDocument();
  const chunks = [];

  return new Promise((resolve) => {
    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));

    doc.fontSize(20).text('SEVA SETU KENDRA', { align: 'center' });
    doc.fontSize(12).text('Connecting Citizens with Government Opportunities', { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text('Agent Registration Request Received');
    doc.moveDown();
    doc.text(`Name: ${data.fullName}`);
    doc.text(`Email: ${data.email}`);
    doc.text(`Mobile: ${data.mobile}`);
    doc.text(`State: ${data.state}`);
    doc.text(`District: ${data.district}`);
    doc.moveDown();
    doc.text('Your application is under review by the admin team.');
    doc.end();
  });
}

module.exports = { generateAgentReceipt };
