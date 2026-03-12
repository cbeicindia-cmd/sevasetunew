require('dotenv').config();
const db = require('../config/db');

async function seed() {
  const rows = [];
  for (let i = 1; i <= 1000; i += 1) {
    rows.push(db.query(
      `INSERT INTO schemes (scheme_id, scheme_name, description, benefits, eligibility, documents_required,
       application_process, official_link, state, department, category, source_portal)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
       ON CONFLICT (scheme_id) DO NOTHING`,
      [
        `SSK-${String(i).padStart(4, '0')}`,
        `Sample Scheme ${i}`,
        'Support scheme for citizens with targeted welfare outcomes.',
        'Financial and social assistance',
        'As per government notification',
        'Aadhar, PAN, residence and income proofs',
        'Apply through authorized Seva Setu Agent or official portal',
        'https://www.myscheme.gov.in',
        i % 2 ? 'Maharashtra' : 'Karnataka',
        i % 2 ? 'Social Justice' : 'Rural Development',
        i % 3 ? 'Education' : 'Health',
        'Seed Generator'
      ]
    ));
  }

  await Promise.all(rows);
  console.log('Seeded 1000 schemes');
  process.exit(0);
}

seed();
