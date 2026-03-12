const db = require('../config/db');

async function stats(req, res) {
  const [schemes, agents, citizens, applications] = await Promise.all([
    db.query('SELECT COUNT(*) FROM schemes'),
    db.query('SELECT COUNT(*) FROM agents'),
    db.query("SELECT COUNT(*) FROM users WHERE role='citizen'"),
    db.query('SELECT COUNT(*) FROM applications'),
  ]);

  res.json({
    totalSchemes: Number(schemes.rows[0].count),
    totalAgents: Number(agents.rows[0].count),
    totalCitizens: Number(citizens.rows[0].count),
    totalApplications: Number(applications.rows[0].count),
  });
}

module.exports = { stats };
