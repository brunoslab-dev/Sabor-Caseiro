# Sabor Caseiro API

Backend for the Sabor Caseiro restaurant portfolio project.

## Stack

- Node.js
- TypeScript
- Fastify
- Zod
- Prisma
- PostgreSQL

## Run locally

1. Start PostgreSQL:

```bash
docker compose up -d postgres
```

2. Install backend dependencies:

```bash
cd backend
npm install
```

3. Create the environment file:

```bash
cp .env.example .env
```

4. Generate Prisma Client and run the first migration:

```bash
npm run prisma:generate
npm run prisma:migrate -- --name init
```

5. Start the API:

```bash
npm run dev
```

The API runs at `http://localhost:3333`.

## Endpoints

### Health

`GET /health`

### Create reservation

`POST /api/reservations`

Example payload:

```json
{
  "name": "Ana Silva",
  "email": "ana@example.com",
  "date": "2026-10-20",
  "time": "20:00",
  "guests": 4,
  "message": "Birthday dinner"
}
```

The API validates the payload before writing to PostgreSQL.

## Security note

Reservation listing is intentionally not public. An authenticated admin API will be added in the next stage so personal reservation data is never exposed through an unauthenticated endpoint.
