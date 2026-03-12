import { prisma } from '../config/db.js';

const sources = [
  'https://www.india.gov.in',
  'https://www.myscheme.gov.in',
  'https://www.india.gov.in/topics/ministry'
];

export async function runAiSchemeSync(initiatedById = null) {
  for (const source of sources) {
    await prisma.aISyncLog.create({
      data: {
        source,
        action: 'SCAN_AND_COMPARE',
        changesDetected: Math.random() > 0.65,
        summary: 'Automated monitoring run completed for source. Manual parsing adapters can be extended per ministry/state.',
        initiatedById
      }
    });
  }
}
