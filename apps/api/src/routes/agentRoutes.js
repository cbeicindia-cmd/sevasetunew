import express from 'express';
import { query } from '../config/db.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();
router.use(requireAuth(['agent']));

router.get('/dashboard', async (req, res) => {
  const { rows } = await query('SELECT * FROM applications WHERE agent_id=$1 ORDER BY created_at DESC', [req.user.id]);
  res.json({ recentApplications: rows.slice(0, 10), totalApplications: rows.length });
});

export default router;
