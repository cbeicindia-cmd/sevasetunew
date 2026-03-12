const express = require('express');
const db = require('../config/db');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();
router.use(authenticate, authorize(['admin', 'super_admin']));

router.get('/stats', async (_req, res) => {
  const [schemes, agents, citizens, applications] = await Promise.all([
    db.query('SELECT COUNT(*)::int count FROM schemes'),
    db.query("SELECT COUNT(*)::int count FROM users WHERE role='agent'"),
    db.query("SELECT COUNT(*)::int count FROM users WHERE role='citizen'"),
    db.query('SELECT COUNT(*)::int count FROM citizen_applications')
  ]);

  res.json({
    totalSchemes: schemes.rows[0].count,
    totalAgents: agents.rows[0].count,
    totalCitizens: citizens.rows[0].count,
    applications: applications.rows[0].count
  });
});

router.get('/agents/pending', async (_req, res) => {
  const result = await db.query(
    `SELECT a.id, u.full_name, u.email, u.mobile, a.approval_status, a.created_at
     FROM agents a JOIN users u ON u.id = a.user_id WHERE a.approval_status='pending'`
  );
  res.json(result.rows);
});

router.patch('/agents/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status, remarks } = req.body;
  const result = await db.query(
    `UPDATE agents SET approval_status=$1, remarks=$2, reviewed_by=$3, reviewed_at=NOW() WHERE id=$4 RETURNING *`,
    [status, remarks || null, req.user.id, id]
  );
  res.json(result.rows[0]);
});

router.get('/ai-update-logs', async (_req, res) => {
  const logs = await db.query('SELECT * FROM ai_update_logs ORDER BY created_at DESC LIMIT 100');
  res.json(logs.rows);
});

module.exports = router;
