CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  mobile VARCHAR(20) UNIQUE NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  state VARCHAR(80) NOT NULL,
  district VARCHAR(80) NOT NULL,
  password_hash TEXT NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('super_admin','admin','agent','citizen')),
  status VARCHAR(20) DEFAULT 'approved',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS agents (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(120) NOT NULL,
  mobile VARCHAR(20) UNIQUE NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  aadhar_number VARCHAR(20) NOT NULL,
  pan_number VARCHAR(20) NOT NULL,
  state VARCHAR(80) NOT NULL,
  district VARCHAR(80) NOT NULL,
  address TEXT NOT NULL,
  education VARCHAR(120) NOT NULL,
  experience TEXT,
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
  remarks TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS schemes (
  id SERIAL PRIMARY KEY,
  scheme_id VARCHAR(80) UNIQUE NOT NULL,
  scheme_name VARCHAR(255) NOT NULL,
  description TEXT,
  benefits TEXT,
  eligibility TEXT,
  documents_required TEXT,
  application_process TEXT,
  official_link TEXT,
  state VARCHAR(80),
  department VARCHAR(120),
  category VARCHAR(120),
  last_updated TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS applications (
  id SERIAL PRIMARY KEY,
  scheme_id VARCHAR(80) NOT NULL,
  citizen_id INTEGER REFERENCES users(id),
  agent_id INTEGER REFERENCES agents(id),
  status VARCHAR(30) DEFAULT 'submitted',
  documents JSONB,
  remarks TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ai_update_logs (
  id SERIAL PRIMARY KEY,
  details TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
