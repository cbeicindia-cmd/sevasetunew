const db = require('../config/db');

async function listSchemes(req, res) {
  const { state, category, department, q } = req.query;
  const clauses = [];
  const params = [];
  if (state) { params.push(state); clauses.push(`state = $${params.length}`); }
  if (category) { params.push(category); clauses.push(`category = $${params.length}`); }
  if (department) { params.push(department); clauses.push(`department = $${params.length}`); }
  if (q) { params.push(`%${q}%`); clauses.push(`scheme_name ILIKE $${params.length}`); }

  const where = clauses.length ? `WHERE ${clauses.join(' AND ')}` : '';
  const result = await db.query(`SELECT * FROM schemes ${where} ORDER BY last_updated DESC LIMIT 200`, params);
  res.json(result.rows);
}

async function upsertScheme(req, res) {
  const s = req.body;
  await db.query(
    `INSERT INTO schemes (scheme_id,scheme_name,description,benefits,eligibility,documents_required,application_process,official_link,state,department,category,last_updated)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,NOW())
     ON CONFLICT (scheme_id) DO UPDATE SET
     scheme_name=EXCLUDED.scheme_name,description=EXCLUDED.description,benefits=EXCLUDED.benefits,
     eligibility=EXCLUDED.eligibility,documents_required=EXCLUDED.documents_required,
     application_process=EXCLUDED.application_process,official_link=EXCLUDED.official_link,state=EXCLUDED.state,
     department=EXCLUDED.department,category=EXCLUDED.category,last_updated=NOW()`,
    [s.scheme_id, s.scheme_name, s.description, s.benefits, s.eligibility, s.documents_required, s.application_process, s.official_link, s.state, s.department, s.category]
  );
  res.json({ message: 'Scheme upserted' });
}

module.exports = { listSchemes, upsertScheme };
