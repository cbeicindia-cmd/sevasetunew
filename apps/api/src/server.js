import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import fs from 'fs';
import authRoutes from './routes/authRoutes.js';
import schemeRoutes from './routes/schemeRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import agentRoutes from './routes/agentRoutes.js';
import citizenRoutes from './routes/citizenRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import { startAiSyncJob } from './jobs/aiSyncJob.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

fs.mkdirSync('uploads', { recursive: true });

app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json({ limit: '5mb' }));
app.use(morgan('dev'));

app.get('/health', (_req, res) => res.json({ status: 'ok', service: 'SEVA SETU KENDRA API' }));

app.use('/api/auth', authRoutes);
app.use('/api/schemes', schemeRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/agent', agentRoutes);
app.use('/api/citizen', citizenRoutes);
app.use('/api/applications', applicationRoutes);

app.listen(PORT, () => {
  startAiSyncJob();
  console.log(`SEVA SETU KENDRA API running at http://localhost:${PORT}`);
});
