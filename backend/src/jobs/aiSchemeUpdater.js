const cron = require('node-cron');
const db = require('../config/db');

const sources = [
  'https://www.india.gov.in',
  'https://www.myscheme.gov.in',
  'https://www.pmindia.gov.in'
];

async function runAiSchemeUpdate() {
  let changes = 0;
  for (const source of sources) {
    // placeholder AI crawler integration hook (LLM + scraper)
    await db.query(
      'INSERT INTO ai_update_logs (source_name, summary, changes_detected, status) VALUES ($1,$2,$3,$4)',
      [source, 'Scheduled scan completed. Ready for parser integration.', 0, 'success']
    );
    changes += 0;
  }
  return { scanned: sources.length, changes };
}

function scheduleAiUpdates() {
  cron.schedule('0 2 * * *', async () => {
    try {
      await runAiSchemeUpdate();
      console.log('AI scheme update completed');
    } catch (error) {
      await db.query(
        'INSERT INTO ai_update_logs (source_name, summary, status) VALUES ($1,$2,$3)',
        ['scheduler', error.message, 'failed']
      );
    }
  });
}

module.exports = { scheduleAiUpdates, runAiSchemeUpdate };
