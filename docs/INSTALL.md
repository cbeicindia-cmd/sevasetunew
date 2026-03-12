# Installation Guide - SEVA SETU KENDRA

## 1) Prerequisites
- Docker + Docker Compose
- Or Node.js 20+ and PostgreSQL 15+

## 2) Run with Docker (Recommended)
```bash
docker compose up --build
```

## 3) Local Development (Without Docker)

### Database
```bash
createdb sevasetu
psql sevasetu < database/schema.sql
```

### Backend
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 4) Seed Sample Schemes (1000)
```bash
cd backend
npm run seed
```

## 5) Production Hardening Checklist
- Use managed Postgres backups
- Set TLS reverse proxy (Nginx/Caddy)
- Replace OTP mock with actual SMS API integration
- Use secure object storage for documents
- Enable app monitoring and centralized logs
