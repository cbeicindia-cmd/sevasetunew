import express from 'express';
import { query } from '../config/db.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();
router.use(requireAuth(['citizen']));

router.get('/nearest-agents', async (req, res) => {
  const { rows } = await query(
    "SELECT id,name,mobile,email,state,district FROM users WHERE role='agent' AND state=$1 AND district=$2 AND status='approved'",
    [req.query.state, req.query.district]
  );
  res.json(rows);
});

router.get('/applications', async (req, res) => {
  const { rows } = await query('SELECT * FROM applications WHERE citizen_id=$1 ORDER BY created_at DESC', [req.user.id]);
  res.json(rows);
});

export default router;
