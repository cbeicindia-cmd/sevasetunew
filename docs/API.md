# SEVA SETU KENDRA API Documentation

## Auth
- `POST /api/auth/otp/request` - Request SMS OTP
- `POST /api/auth/citizen/register` - Register citizen with OTP verification
- `POST /api/auth/login` - Login for all user roles

## Schemes
- `GET /api/schemes` - List/search schemes (`state`, `category`, `department`, `q`)
- `POST /api/schemes` - Upsert scheme (Admin/Super Admin)

## Agent
- `POST /api/agents/register` - Register as agent + document upload
- `GET /api/agents` - List agent applications (Admin/Super Admin)
- `PATCH /api/agents/:id/status` - Approve/reject + remarks

## Admin
- `GET /api/admin/stats` - Dashboard metrics (Admin/Super Admin)

## Security
- JWT bearer token auth
- RBAC middleware by role
- Helmet + rate limiting + input validation
