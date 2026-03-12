const express = require('express');
const db = require('../config/db');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();
router.use(authenticate, authorize(['agent']));

router.get('/schemes', async (_req, res) => {
  const result = await db.query('SELECT id, scheme_name, state, category, department FROM schemes ORDER BY scheme_name ASC LIMIT 500');
  res.json(result.rows);
});

router.post('/applications', async (req, res) => {
  const { citizenId, schemeId, notes, uploadedDocuments } = req.body;
  const agent = await db.query('SELECT id FROM agents WHERE user_id=$1 AND approval_status=\'approved\'', [req.user.id]);
  if (!agent.rowCount) return res.status(403).json({ message: 'Agent not approved yet' });

  const result = await db.query(
    `INSERT INTO citizen_applications (citizen_id, agent_id, scheme_id, notes, uploaded_documents)
     VALUES ($1,$2,$3,$4,$5) RETURNING *`,
    [citizenId, agent.rows[0].id, schemeId, notes || null, uploadedDocuments || {}]
  );
  return res.status(201).json(result.rows[0]);
});

module.exports = router;
