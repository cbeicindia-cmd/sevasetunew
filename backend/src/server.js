require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const authRoutes = require('./routes/authRoutes');
const agentRoutes = require('./routes/agentRoutes');
const schemeRoutes = require('./routes/schemeRoutes');
const adminRoutes = require('./routes/adminRoutes');
const { startSchemeUpdateJob } = require('./jobs/schemeUpdateJob');

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json({ limit: '5mb' }));
app.use('/uploads', express.static('uploads'));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 500 }));

app.get('/health', (_, res) => res.json({ name: 'SEVA SETU KENDRA API', status: 'ok' }));
app.use('/api/auth', authRoutes);
app.use('/api/agents', agentRoutes);
app.use('/api/schemes', schemeRoutes);
app.use('/api/admin', adminRoutes);

startSchemeUpdateJob();

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`SEVA SETU KENDRA backend running on ${port}`);
});
