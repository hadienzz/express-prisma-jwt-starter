# Express Prisma JWT Starter

A production-ready Express.js REST API starter with TypeScript, Prisma ORM, and JWT authentication.

## Features

- **TypeScript** — Strict typing throughout the codebase
- **Express 4** — Fast, minimal web framework
- **Prisma 5** — Type-safe ORM with PostgreSQL
- **JWT Authentication** — Access tokens (15m) + Refresh tokens (7d) stored in DB
- **bcryptjs** — Secure password hashing
- **express-validator** — Request validation
- **Refresh Token Rotation** — Refresh tokens persisted in the database with expiry

## Project Structure

```
src/
├── index.ts                  # Entry point
├── app.ts                    # Express app setup
├── lib/
│   ├── prisma.ts             # Prisma client singleton
│   └── jwt.ts                # JWT utilities
├── middleware/
│   └── auth.middleware.ts    # Bearer token authentication
├── controllers/
│   ├── auth.controller.ts    # register, login, refresh, logout
│   └── user.controller.ts    # getProfile
├── routes/
│   ├── auth.routes.ts        # /api/auth/*
│   └── user.routes.ts        # /api/users/*
└── types/
    └── express.d.ts          # Express Request augmentation
prisma/
└── schema.prisma             # Database schema
```

## Setup

### 1. Clone and install

```bash
git clone <repo-url>
cd express-prisma-jwt-starter
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
# Edit .env with your database URL and JWT secrets
```

### 3. Run database migrations

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 4. Start development server

```bash
npm run dev
```

### 5. Build for production

```bash
npm run build
npm start
```

## API Endpoints

### Auth (`/api/auth`)

| Method | Path        | Auth | Description                          |
|--------|-------------|------|--------------------------------------|
| POST   | /register   | No   | Create a new user account            |
| POST   | /login      | No   | Authenticate and receive tokens      |
| POST   | /refresh    | No   | Exchange refresh token for new access token |
| POST   | /logout     | No   | Invalidate a refresh token           |

### Users (`/api/users`)

| Method | Path        | Auth | Description              |
|--------|-------------|------|--------------------------|
| GET    | /profile    | Yes  | Get current user profile |

## Example Requests

### Register

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"secret123","name":"Alice"}'
```

**Response:**
```json
{
  "accessToken": "<jwt>",
  "refreshToken": "<jwt>"
}
```

### Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"secret123"}'
```

### Get Profile (protected)

```bash
curl http://localhost:3000/api/users/profile \
  -H "Authorization: Bearer <accessToken>"
```

### Refresh Token

```bash
curl -X POST http://localhost:3000/api/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{"refreshToken":"<refreshToken>"}'
```

### Logout

```bash
curl -X POST http://localhost:3000/api/auth/logout \
  -H "Content-Type: application/json" \
  -d '{"refreshToken":"<refreshToken>"}'
```

## Environment Variables

| Variable            | Description                        | Default        |
|---------------------|------------------------------------|----------------|
| `DATABASE_URL`      | PostgreSQL connection string       | —              |
| `JWT_ACCESS_SECRET` | Secret for signing access tokens   | —              |
| `JWT_REFRESH_SECRET`| Secret for signing refresh tokens  | —              |
| `JWT_ACCESS_EXPIRY` | Access token expiry (e.g. `15m`)   | `15m`          |
| `JWT_REFRESH_EXPIRY`| Refresh token expiry (e.g. `7d`)   | `7d`           |
| `PORT`              | HTTP server port                   | `3000`         |
| `NODE_ENV`          | Environment (`development`/`production`) | `development` |

## License

MIT