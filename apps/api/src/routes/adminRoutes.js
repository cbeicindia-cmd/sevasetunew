import express from 'express';
import { body } from 'express-validator';
import { query } from '../config/db.js';
import { requireAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = express.Router();
router.use(requireAuth(['super_admin', 'admin']));

router.get('/stats', async (_req, res) => {
  const [schemes, agents, citizens, applications] = await Promise.all([
    query('SELECT COUNT(*)::int AS count FROM schemes'),
    query("SELECT COUNT(*)::int AS count FROM users WHERE role='agent'"),
    query("SELECT COUNT(*)::int AS count FROM users WHERE role='citizen'"),
    query('SELECT COUNT(*)::int AS count FROM applications')
  ]);
  res.json({
    totalSchemes: schemes.rows[0].count,
    totalAgents: agents.rows[0].count,
    totalCitizens: citizens.rows[0].count,
    applications: applications.rows[0].count
  });
});

router.get('/agent-applications', async (_req, res) => {
  const { rows } = await query('SELECT * FROM agent_applications ORDER BY created_at DESC');
  res.json(rows);
});

router.patch('/agent-applications/:id', [
  body('status').isIn(['approved', 'rejected']),
  body('remarks').optional().isString()
], validate, async (req, res) => {
  const { id } = req.params;
  const { status, remarks } = req.body;
  const { rows } = await query(
    `UPDATE agent_applications SET status=$1, remarks=$2, reviewed_at=NOW() WHERE id=$3 RETURNING *`,
    [status, remarks || null, id]
  );

  if (status === 'approved') {
    const app = rows[0];
    await query(
      `INSERT INTO users (name,mobile,email,password_hash,role,state,district,status)
       VALUES ($1,$2,$3,$4,'agent',$5,$6,'approved') ON CONFLICT (email) DO NOTHING`,
      [app.full_name, app.mobile, app.email, '$2a$10$fakesettemppasswordhash..............', app.state, app.district]
    );
  }

  res.json(rows[0]);
});

router.get('/ai-update-logs', async (_req, res) => {
  const { rows } = await query('SELECT * FROM ai_update_logs ORDER BY run_at DESC LIMIT 100');
  res.json(rows);
});

export default router;
