CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE user_role AS ENUM ('super_admin', 'admin', 'agent', 'citizen');
CREATE TYPE approval_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE application_status AS ENUM ('submitted', 'under_review', 'approved', 'rejected');

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name VARCHAR(150) NOT NULL,
  mobile VARCHAR(15) UNIQUE NOT NULL,
  email VARCHAR(120) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role user_role NOT NULL,
  state VARCHAR(80),
  district VARCHAR(80),
  is_mobile_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE agents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  aadhar_number VARCHAR(20) NOT NULL,
  pan_number VARCHAR(20) NOT NULL,
  address TEXT NOT NULL,
  education VARCHAR(120),
  experience TEXT,
  documents JSONB DEFAULT '{}'::jsonb,
  approval_status approval_status DEFAULT 'pending',
  remarks TEXT,
  reviewed_by UUID REFERENCES users(id),
  reviewed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE citizens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE schemes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  scheme_id VARCHAR(50) UNIQUE NOT NULL,
  scheme_name VARCHAR(255) NOT NULL,
  description TEXT,
  benefits TEXT,
  eligibility TEXT,
  documents_required TEXT,
  application_process TEXT,
  official_link TEXT,
  state VARCHAR(80) NOT NULL,
  department VARCHAR(120),
  category VARCHAR(80),
  income_limit NUMERIC,
  gender VARCHAR(20),
  age_min INT,
  age_max INT,
  source_portal VARCHAR(120),
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE citizen_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  citizen_id UUID NOT NULL REFERENCES citizens(id),
  agent_id UUID NOT NULL REFERENCES agents(id),
  scheme_id UUID NOT NULL REFERENCES schemes(id),
  status application_status DEFAULT 'submitted',
  uploaded_documents JSONB DEFAULT '{}'::jsonb,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE otp_verifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  mobile VARCHAR(15) NOT NULL,
  otp_code VARCHAR(6) NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ai_update_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  source_name VARCHAR(120) NOT NULL,
  summary TEXT,
  changes_detected INT DEFAULT 0,
  status VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_schemes_state_category ON schemes(state, category);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_agents_status ON agents(approval_status);
