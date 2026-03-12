import cron from 'node-cron';
import { runAiSchemeSync } from '../services/aiUpdateService.js';

export const startAiSyncJob = () => {
  cron.schedule('0 2 * * *', async () => {
    console.log('Running scheduled AI scheme sync...');
    await runAiSchemeSync();
  });
};
