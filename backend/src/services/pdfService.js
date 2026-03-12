import PDFDocument from 'pdfkit';

export function generateAgentAcknowledgementPdf(agentName) {
  return new Promise((resolve) => {
    const doc = new PDFDocument();
    const chunks = [];

    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));

    doc.fontSize(18).text('SEVA SETU KENDRA', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text('Agent Registration Request Received');
    doc.moveDown();
    doc.text(`Dear ${agentName},`);
    doc.text('Your registration request has been received and is pending admin review.');
    doc.text('Tagline: Connecting Citizens with Government Opportunities');
    doc.end();
  });
}
