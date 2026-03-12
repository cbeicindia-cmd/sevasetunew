const express = require('express');
const db = require('../config/db');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  const { state, category, department, gender, minIncome, age } = req.query;
  const filters = [];
  const values = [];

  if (state) { values.push(state); filters.push(`state = $${values.length}`); }
  if (category) { values.push(category); filters.push(`category = $${values.length}`); }
  if (department) { values.push(department); filters.push(`department = $${values.length}`); }
  if (gender) { values.push(gender); filters.push(`(gender IS NULL OR gender = $${values.length})`); }
  if (minIncome) { values.push(Number(minIncome)); filters.push(`(income_limit IS NULL OR income_limit >= $${values.length})`); }
  if (age) { values.push(Number(age)); filters.push(`(age_min IS NULL OR age_min <= $${values.length}) AND (age_max IS NULL OR age_max >= $${values.length})`); }

  const where = filters.length ? `WHERE ${filters.join(' AND ')}` : '';
  const result = await db.query(`SELECT * FROM schemes ${where} ORDER BY last_updated DESC LIMIT 200`, values);
  return res.json(result.rows);
});

router.post('/', authenticate, authorize(['admin', 'super_admin']), async (req, res) => {
  const s = req.body;
  const result = await db.query(
    `INSERT INTO schemes (scheme_id, scheme_name, description, benefits, eligibility, documents_required,
      application_process, official_link, state, department, category, income_limit, gender, age_min, age_max, source_portal)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16) RETURNING *`,
    [s.schemeId, s.schemeName, s.description, s.benefits, s.eligibility, s.documentsRequired, s.applicationProcess,
      s.officialLink, s.state, s.department, s.category, s.incomeLimit, s.gender, s.ageMin, s.ageMax, s.sourcePortal]
  );
  return res.status(201).json(result.rows[0]);
});

module.exports = router;
