# Installation Guide (Docker + VPS Ready)

## 1. Clone and configure
```bash
git clone <repo>
cd sevasetunew
cp backend/.env.example backend/.env
```

Update environment variables for SMTP, SMS API, JWT secret.

## 2. Start stack
```bash
docker compose up --build -d
```

## 3. Run migrations and seed
```bash
docker compose exec backend npx prisma migrate dev --name init
docker compose exec backend npm run seed
```

## 4. Access services
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000/health`

## 5. Production VPS notes
- Put Nginx in front for SSL termination.
- Use managed SMTP and SMS providers.
- Use object storage (S3/MinIO) for document files.
- Add CI/CD for lint/test/build/deploy pipeline.
