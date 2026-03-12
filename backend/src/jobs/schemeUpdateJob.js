const cron = require('node-cron');
const { crawlAndUpdateSchemes } = require('../services/schemeCrawlerService');

function startSchemeUpdateJob() {
  cron.schedule('0 2 * * *', async () => {
    await crawlAndUpdateSchemes();
  });
}

module.exports = { startSchemeUpdateJob };
