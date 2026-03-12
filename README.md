# SEVA SETU KENDRA

**Tagline:** Connecting Citizens with Government Opportunities

A full-stack AI-powered Government Schemes Platform with:
- Public website (Next.js + TailwindCSS)
- Backend API/Admin services (Node.js + Express)
- Agent dashboard and Citizen panel
- JWT auth with OTP flow
- AI update scheduler for scheme monitoring
- PostgreSQL database for 1000+ schemes
- Docker/VPS-ready deployment

## Project Structure
- `apps/web` - Frontend website + dashboards
- `apps/api` - Backend API, auth, admin workflows, AI job
- `database/schema.sql` - PostgreSQL schema
- `docs/API.md` - API endpoints
- `docker-compose.yml` - Local/VPS container orchestration

## Quick Start
1. `docker compose up --build`
2. Open frontend: `http://localhost:3000`
3. API health check: `http://localhost:4000/health`

## Local Development
### Backend
```bash
cd apps/api
npm install
cp .env.example .env
npm run dev
```

### Frontend
```bash
cd apps/web
npm install
cp .env.example .env.local
npm run dev
```

## Database Seed (1000+ schemes)
```bash
cd apps/api
npm run seed
```

## Key Features Implemented
- Role-based access: super_admin, admin, agent, citizen
- Agent application flow: registration, OTP hooks, email confirmation with PDF acknowledgement, admin approval statuses
- Scheme directory with search and filters
- Citizen features: login-ready panel, nearest agent discovery, application tracking API
- Agent features: submit citizen applications and status tracking
- AI automation: scheduled (every 24h) scheme sync logging and alerts pipeline foundation
- Security: Helmet, CORS, JWT middleware, input validation
- Document management foundation via uploaded document paths and structured storage directories

## Production Notes
- Replace placeholder OTP integration with your SMS gateway payload.
- Configure SMTP and secure secrets through environment variables.
- Add object storage (S3/MinIO) for production document uploads.
- Add monitoring stack (Prometheus/Grafana) and reverse proxy (Nginx/Caddy) on VPS.
