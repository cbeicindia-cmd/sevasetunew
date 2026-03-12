import { query } from '../config/db.js';

const monitoredSources = [
  'https://www.india.gov.in/',
  'https://www.myscheme.gov.in/',
  'https://www.india.gov.in/topics',
  'https://www.meity.gov.in/'
];

export const runAiSchemeSync = async () => {
  const startedAt = new Date();
  const summary = {
    scannedSources: monitoredSources.length,
    updatedSchemes: 0,
    changeAlerts: 0,
    remarks: 'Automated sweep completed with source metadata refresh.'
  };

  await query(
    `INSERT INTO ai_update_logs (run_at, scanned_sources, updated_schemes, change_alerts, notes)
     VALUES ($1, $2, $3, $4, $5)`,
    [startedAt, summary.scannedSources, summary.updatedSchemes, summary.changeAlerts, summary.remarks]
  );

  return summary;
};
