import express from 'express';
import { query } from '../config/db.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const { state, category, department, gender, minAge, maxIncome, q } = req.query;
  const conditions = [];
  const params = [];

  if (state) {
    params.push(state);
    conditions.push(`state = $${params.length}`);
  }
  if (category) {
    params.push(category);
    conditions.push(`category = $${params.length}`);
  }
  if (department) {
    params.push(department);
    conditions.push(`department = $${params.length}`);
  }
  if (gender) {
    params.push(`%${gender}%`);
    conditions.push(`eligibility ILIKE $${params.length}`);
  }
  if (minAge) {
    params.push(`%${minAge}%`);
    conditions.push(`eligibility ILIKE $${params.length}`);
  }
  if (maxIncome) {
    params.push(`%${maxIncome}%`);
    conditions.push(`eligibility ILIKE $${params.length}`);
  }
  if (q) {
    params.push(`%${q}%`);
    conditions.push(`(scheme_name ILIKE $${params.length} OR description ILIKE $${params.length})`);
  }

  const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  const { rows } = await query(`SELECT * FROM schemes ${whereClause} ORDER BY last_updated DESC LIMIT 200`, params);
  res.json(rows);
});

export default router;
