# SEVA SETU KENDRA

**Connecting Citizens with Government Opportunities**

Production-oriented full-stack platform for citizens, service agents, and administrators to discover and process Central/State government schemes.

## Architecture
- **Frontend:** Next.js + TailwindCSS (`/frontend`)
- **Backend:** Node.js + Express (`/backend`)
- **Database:** PostgreSQL with seed for 1000 schemes (`/backend/sql`)
- **Auth:** JWT + OTP (SMS integration hook)
- **Notifications:** SMTP email + PDF acknowledgement for agent registration
- **AI Update Agent:** Scheduled crawler every 24 hours with update logs
- **Deployment:** Dockerfiles + docker-compose for VPS-ready setup

## Feature Coverage
- Public website pages (Home/About/Schemes/Become Agent/Login/Contact)
- Government scheme directory + filters endpoint
- Agent onboarding with admin approval workflow
- Citizen registration + login + OTP verification
- Admin panel APIs for stats, scheme management, and agent approvals
- Agent and Citizen dashboards (frontend routes)
- Document upload support
- AI scheme update scheduler and logs

## Local Setup
```bash
# 1) Start full stack
 docker compose up --build

# 2) Frontend
 http://localhost:3000

# 3) Backend health
 http://localhost:5000/health
```

## Manual DB Commands (optional)
```bash
psql "$DATABASE_URL" -f backend/sql/schema.sql
psql "$DATABASE_URL" -f backend/sql/seed_schemes.sql
```

## Production Notes
- Replace `.env` placeholders with secure values
- Plug real SMS gateway in `backend/src/services/otpService.js`
- Add TLS termination (Nginx/Caddy) on VPS
- Move uploads to S3-compatible object storage for scale

See detailed API docs: `docs/API.md`.
