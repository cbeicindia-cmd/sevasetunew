# SEVA SETU KENDRA API Documentation

## Base URL
`http://localhost:4000/api`

## Auth
- `POST /auth/otp/send`
- `POST /auth/otp/verify`
- `POST /auth/register/citizen`
- `POST /auth/register/agent`
- `POST /auth/login`

## Schemes
- `GET /schemes?q=&state=&category=&department=&gender=&minAge=&maxIncome=`

## Admin (JWT: admin or super_admin)
- `GET /admin/stats`
- `GET /admin/agent-applications`
- `PATCH /admin/agent-applications/:id`
- `GET /admin/ai-update-logs`

## Agent (JWT: agent)
- `GET /agent/dashboard`
- `POST /applications`

## Citizen (JWT: citizen)
- `GET /citizen/nearest-agents?state=&district=`
- `GET /citizen/applications`

## Application Tracking
- `GET /applications/track/:id`
