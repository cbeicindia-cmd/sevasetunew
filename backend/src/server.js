import app from './app.js';
import { env } from './config/env.js';
import { startAiScheduler } from './jobs/aiScheduler.js';

app.listen(env.port, () => {
  console.log(`SEVA SETU KENDRA API running on port ${env.port}`);
});

startAiScheduler();
