import dotenv from 'dotenv';
import { query } from '../src/config/db.js';

dotenv.config();

const states = ['Maharashtra', 'Gujarat', 'Karnataka', 'Tamil Nadu', 'Rajasthan'];
const categories = ['Education', 'Health', 'Agriculture', 'Women Welfare', 'Employment'];
const departments = ['Ministry of Rural Development', 'Ministry of Education', 'State Welfare Dept'];

const run = async () => {
  for (let i = 1; i <= 1000; i += 1) {
    await query(
      `INSERT INTO schemes (scheme_id, scheme_name, description, benefits, eligibility, documents_required, application_process, official_link, state, department, category, last_updated)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,NOW()) ON CONFLICT (scheme_id) DO NOTHING`,
      [
        `SSK-${i.toString().padStart(4, '0')}`,
        `Government Opportunity Scheme ${i}`,
        'Financial and social support program for eligible citizens.',
        'Subsidy, scholarship, direct benefit transfer',
        'Age 18+, income criteria as per guidelines, gender-neutral unless specified',
        ['Aadhar', 'Income Certificate', 'Residence Proof'],
        'Apply through nearest Seva Setu Agent or online portal.',
        'https://www.myscheme.gov.in/',
        states[i % states.length],
        departments[i % departments.length],
        categories[i % categories.length]
      ]
    );
  }

  console.log('Seeded 1000+ schemes successfully');
  process.exit(0);
};

run();
