import cron from 'node-cron';
import { runAiSchemeSync } from '../services/aiSyncService.js';

export function startAiScheduler() {
  cron.schedule('0 0 * * *', async () => {
    console.log('Running AI scheme sync job...');
    await runAiSchemeSync();
  });
}
