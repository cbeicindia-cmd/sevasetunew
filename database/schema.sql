CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(150) NOT NULL,
  mobile VARCHAR(15) UNIQUE NOT NULL,
  email VARCHAR(180) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role VARCHAR(30) NOT NULL CHECK (role IN ('super_admin', 'admin', 'agent', 'citizen')),
  state VARCHAR(100),
  district VARCHAR(100),
  status VARCHAR(30) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS schemes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  scheme_id VARCHAR(100) UNIQUE NOT NULL,
  scheme_name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  benefits TEXT NOT NULL,
  eligibility TEXT NOT NULL,
  documents_required TEXT[] NOT NULL,
  application_process TEXT NOT NULL,
  official_link TEXT NOT NULL,
  state VARCHAR(100) NOT NULL,
  department VARCHAR(150) NOT NULL,
  category VARCHAR(120) NOT NULL,
  last_updated TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS agent_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name VARCHAR(150) NOT NULL,
  mobile VARCHAR(15) NOT NULL,
  email VARCHAR(180) NOT NULL,
  aadhar_number VARCHAR(20) NOT NULL,
  pan_number VARCHAR(20) NOT NULL,
  state VARCHAR(100) NOT NULL,
  district VARCHAR(100) NOT NULL,
  address TEXT NOT NULL,
  education VARCHAR(120) NOT NULL,
  experience TEXT NOT NULL,
  document_urls TEXT[] DEFAULT '{}',
  status VARCHAR(20) NOT NULL CHECK (status IN ('pending', 'approved', 'rejected')),
  remarks TEXT,
  reviewed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  citizen_id UUID REFERENCES users(id),
  agent_id UUID REFERENCES users(id),
  scheme_id VARCHAR(100) NOT NULL,
  documents TEXT[] NOT NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'submitted',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ai_update_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  run_at TIMESTAMP NOT NULL,
  scanned_sources INT NOT NULL,
  updated_schemes INT NOT NULL,
  change_alerts INT NOT NULL,
  notes TEXT
);
