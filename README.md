# SEVA SETU KENDRA

**Tagline:** _Connecting Citizens with Government Opportunities_

SEVA SETU KENDRA is a production-oriented full-stack platform that connects citizens with Central and State government schemes through verified service agents.

## Monorepo Structure

- `frontend/` - Next.js + TailwindCSS public portal and role-based dashboards
- `backend/` - Node.js + Express API with JWT, OTP, RBAC, scheme/application management
- `backend/prisma/` - PostgreSQL schema and seed pipeline for 1000+ schemes
- `docs/` - API docs and deployment instructions
- `docker-compose.yml` - Local/prod-ready stack orchestration

## Core Features

- Public website, scheme discovery, and advanced filtering
- Agent onboarding with OTP + email confirmation and PDF acknowledgment
- Citizen registration/login with OTP verification
- Admin approval workflow for agents
- Role-based dashboards (Super Admin/Admin/Agent/Citizen)
- Scheme application tracking and document metadata handling
- AI scheme update agent (24-hour scheduler + logs)
- Notification channels: email, SMS, and in-app alerts

See `docs/INSTALLATION.md` and `docs/API.md` for full setup and API details.
