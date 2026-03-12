# SEVA SETU KENDRA API Documentation

Base URL: `http://localhost:5000/api`

## Authentication

- `POST /auth/otp/send` → Send mobile OTP
- `POST /auth/otp/verify` → Verify OTP
- `POST /auth/register/agent` → Agent registration with pending approval
- `POST /auth/register/citizen` → Citizen registration
- `POST /auth/login` → Login and get JWT

## Schemes

- `GET /schemes` → Public scheme listing with filters (`state`, `category`, `department`, `gender`, `minIncome`, `age`)
- `POST /schemes` → Add scheme (Admin/Super Admin)

## Admin

- `GET /admin/stats` → Counts for dashboard
- `GET /admin/agents/pending` → Pending agent approvals
- `PATCH /admin/agents/:id/status` → Approve/reject + remarks
- `GET /admin/ai-update-logs` → AI update execution logs

## Agent

- `GET /agent/schemes` → Scheme list for agent dashboard
- `POST /agent/applications` → Submit citizen application

## Citizen

- `GET /citizen/applications` → Track applications
- `GET /citizen/nearest-agents` → Find local approved agents

## AI Scheme Update

- `POST /ai-update/run-now` → Trigger scan manually
- Scheduled scan runs every day at `02:00` using `node-cron`
