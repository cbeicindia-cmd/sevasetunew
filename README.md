# SEVA SETU KENDRA

**Tagline:** _Connecting Citizens with Government Opportunities_

Production-ready, role-based Government Schemes Platform with public portal, admin panel, agent dashboard, citizen panel, and AI-driven scheme update workflow.

## Monorepo Structure

- `frontend/` → Next.js + TailwindCSS public website and dashboards
- `backend/` → Node.js + Express REST API, JWT auth, OTP, role access
- `database/schema.sql` → PostgreSQL schema
- `docs/API.md` → API endpoints
- `docker-compose.yml` → VPS-ready multi-service deployment

## Quick Start

```bash
docker compose up --build
```

Services:
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`
- PostgreSQL: `localhost:5432`

## Core Capabilities

- Public schemes directory with search/filter fields
- Agent registration with OTP + email confirmation + PDF receipt
- Admin approval system (`pending`, `approved`, `rejected`)
- Citizen and Agent role dashboards
- AI update scheduler every 24 hours with update logs
- Document management placeholders for secure uploads
- JWT authentication + role based API protection + rate limiting

## Seeding 1000+ Schemes

```bash
cd backend
npm install
npm run seed
```

## Deployment Notes

- Use strong JWT secret and SMTP credentials in `backend/.env`
- Add production SMS gateway in `sendSmsOtp`
- Frontend and backend are containerized for VPS deployment
