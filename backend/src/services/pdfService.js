const PDFDocument = require('pdfkit');

function generateAgentReceiptPdf(agentName) {
  const doc = new PDFDocument();
  const buffers = [];
  doc.on('data', (chunk) => buffers.push(chunk));

  doc.fontSize(20).text('SEVA SETU KENDRA', { align: 'center' });
  doc.moveDown();
  doc.fontSize(13).text('Agent Registration Request Received');
  doc.moveDown();
  doc.text(`Dear ${agentName},`);
  doc.text('Your request to become a Seva Setu Agent has been successfully received.');
  doc.text('Our Admin team will verify documents and notify your approval status.');
  doc.moveDown();
  doc.text('Tagline: Connecting Citizens with Government Opportunities');
  doc.end();

  return new Promise((resolve) => {
    doc.on('end', () => resolve(Buffer.concat(buffers)));
  });
}

module.exports = { generateAgentReceiptPdf };
