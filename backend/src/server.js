require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const authRoutes = require('./routes/authRoutes');
const schemeRoutes = require('./routes/schemeRoutes');
const adminRoutes = require('./routes/adminRoutes');
const agentRoutes = require('./routes/agentRoutes');
const citizenRoutes = require('./routes/citizenRoutes');
const { scheduleAiUpdates, runAiSchemeUpdate } = require('./jobs/aiSchemeUpdater');

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json({ limit: '3mb' }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 300 }));

app.get('/health', (_req, res) => res.json({ service: 'SEVA SETU KENDRA API', status: 'ok' }));
app.post('/api/ai-update/run-now', async (_req, res) => res.json(await runAiSchemeUpdate()));
app.use('/api/auth', authRoutes);
app.use('/api/schemes', schemeRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/agent', agentRoutes);
app.use('/api/citizen', citizenRoutes);

scheduleAiUpdates();

const port = Number(process.env.PORT || 5000);
app.listen(port, () => console.log(`SEVA SETU KENDRA API running on ${port}`));
