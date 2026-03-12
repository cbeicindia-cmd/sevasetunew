import express from 'express';
import { body } from 'express-validator';
import { query } from '../config/db.js';
import { requireAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = express.Router();

router.post('/', requireAuth(['agent']), [
  body('citizen_id').isUUID(),
  body('scheme_id').notEmpty(),
  body('documents').isArray()
], validate, async (req, res) => {
  const { citizen_id, scheme_id, documents } = req.body;
  const { rows } = await query(
    `INSERT INTO applications (citizen_id,agent_id,scheme_id,documents,status)
     VALUES ($1,$2,$3,$4,'submitted') RETURNING *`,
    [citizen_id, req.user.id, scheme_id, documents]
  );
  res.status(201).json(rows[0]);
});

router.get('/track/:id', requireAuth(['agent', 'citizen', 'admin', 'super_admin']), async (req, res) => {
  const { rows } = await query('SELECT * FROM applications WHERE id=$1', [req.params.id]);
  if (!rows.length) return res.status(404).json({ message: 'Not found' });
  res.json(rows[0]);
});

export default router;
