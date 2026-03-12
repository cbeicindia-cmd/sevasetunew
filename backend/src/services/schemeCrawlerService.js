const axios = require('axios');
const cheerio = require('cheerio');
const db = require('../config/db');

const sources = [
  'https://www.india.gov.in',
  'https://www.myscheme.gov.in',
];

async function crawlAndUpdateSchemes() {
  const log = [];
  for (const source of sources) {
    try {
      const { data } = await axios.get(source, { timeout: 10000 });
      const $ = cheerio.load(data);
      const title = $('title').first().text() || source;
      const schemeId = `AUTO-${Buffer.from(source).toString('base64').slice(0, 8)}`;
      await db.query(
        `INSERT INTO schemes (scheme_id,scheme_name,description,benefits,eligibility,documents_required,application_process,official_link,state,department,category,last_updated)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,NOW())
         ON CONFLICT (scheme_id) DO UPDATE SET scheme_name=EXCLUDED.scheme_name, last_updated=NOW()`,
        [schemeId, title, `Auto-imported from ${source}`, 'Refer official source', 'As per notification', 'As per portal', 'Visit official link', source, 'National', 'Multiple', 'General']
      );
      log.push(`Updated: ${source}`);
    } catch (error) {
      log.push(`Failed: ${source} (${error.message})`);
    }
  }

  await db.query('INSERT INTO ai_update_logs (details) VALUES ($1)', [log.join('\n')]);
  return log;
}

module.exports = { crawlAndUpdateSchemes };
