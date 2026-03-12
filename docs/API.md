# SEVA SETU KENDRA API Documentation

Base URL: `/api`

## Auth
- `POST /auth/otp/request` - Send mobile OTP.
- `POST /auth/otp/verify` - Verify mobile OTP.
- `POST /auth/register` - Register Citizen/Agent.
- `POST /auth/login` - Login and get JWT.

## Schemes
- `GET /schemes` - Public scheme listing with filters:
  - `state`, `category`, `income`, `gender`, `age`, `department`, `q`
- `POST /schemes` - Admin create scheme.
- `PUT /schemes/:id` - Admin update scheme.

## Admin
- `GET /admin/stats` - Dashboard metrics.
- `GET /admin/agents` - Agent applications.
- `PATCH /admin/agents/:id/review` - Approve/Reject with remarks.
- `POST /admin/ai-sync` - Trigger AI sync manually.
- `GET /admin/ai-logs` - AI update logs.

## Applications
- `GET /applications` - Role-scoped application listing.
- `POST /applications` - Agent/Admin submits citizen application.
