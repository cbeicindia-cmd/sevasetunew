import fs from 'fs';
import PDFDocument from 'pdfkit';

export const createAgentAcknowledgementPdf = async ({ name, email }) => {
  const outputDir = 'uploads/letters';
  fs.mkdirSync(outputDir, { recursive: true });
  const filePath = `${outputDir}/agent-request-${Date.now()}.pdf`;

  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(filePath));
  doc.fontSize(20).text('SEVA SETU KENDRA', { align: 'center' });
  doc.moveDown();
  doc.fontSize(14).text('Agent Registration Request Received');
  doc.moveDown();
  doc.text(`Dear ${name},`);
  doc.text('Your request to become a Seva Setu Agent has been received.');
  doc.text(`Registered email: ${email}`);
  doc.text('Our admin team will review and update your application status shortly.');
  doc.end();

  return filePath;
};
