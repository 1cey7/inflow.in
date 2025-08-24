# inflow — minimal study workspace
Features: tasks, focus timer with tracked sessions, exam countdowns. Minimal theme and branding.

## Quickstart (local)
```bash
pnpm i   # or npm i / yarn
cp .env.example .env
# set NEXTAUTH_SECRET to a random long string
pnpm db:push
pnpm dev
```
Open http://localhost:3000

## Deploy
- Set `DATABASE_URL` to your Postgres/SQLite connection (Neon/Supabase/etc).
- Set `NEXTAUTH_URL` to your deployed URL.
- Set `NEXTAUTH_SECRET` to a long random string.

## Branding
- Logo is at `public/logo.jpg` (from your provided file). Replace if needed.
- Footer GitHub link reads from `GITHUB_URL` in `.env`.
