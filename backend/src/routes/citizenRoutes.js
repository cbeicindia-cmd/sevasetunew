const express = require('express');
const db = require('../config/db');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();
router.use(authenticate, authorize(['citizen']));

router.get('/applications', async (req, res) => {
  const apps = await db.query(
    `SELECT ca.id, ca.status, ca.created_at, s.scheme_name, u.full_name as agent_name
     FROM citizen_applications ca
     JOIN citizens c ON c.id = ca.citizen_id
     JOIN schemes s ON s.id = ca.scheme_id
     JOIN agents a ON a.id = ca.agent_id
     JOIN users u ON u.id = a.user_id
     WHERE c.user_id = $1
     ORDER BY ca.created_at DESC`,
    [req.user.id]
  );
  res.json(apps.rows);
});

router.get('/nearest-agents', async (req, res) => {
  const citizen = await db.query('SELECT state, district FROM users WHERE id=$1', [req.user.id]);
  const agents = await db.query(
    `SELECT u.full_name, u.mobile, u.email, u.state, u.district
     FROM agents a JOIN users u ON u.id = a.user_id
     WHERE a.approval_status='approved' AND u.state=$1 AND u.district=$2`,
    [citizen.rows[0].state, citizen.rows[0].district]
  );
  res.json(agents.rows);
});

module.exports = router;
