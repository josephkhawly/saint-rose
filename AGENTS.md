# AGENTS.md

## Cursor Cloud specific instructions

This is a Next.js 15 (App Router) + Payload CMS 3 site (`saint_rose`) backed by Postgres. The
frontend lives under `src/app/(frontend)` and the Payload admin under `src/app/(payload)` (admin
UI at `/admin`). Standard scripts are defined in `package.json` (`dev`, `build`, `start`, `lint`,
`payload`, `generate:types`, `seed`).

### Services

There is a single web service (Next.js + Payload) plus a Postgres database. A local Postgres is
provisioned by the update script (database `saint_rose`, role `postgres`/`postgres`). Payload uses
the `@payloadcms/db-vercel-postgres` adapter, which works against any standard Postgres via
`POSTGRES_URL`.

### Environment variables

`next dev`/`next build` auto-load `.env`. Required for local dev (see `.env`, which is gitignored):
`POSTGRES_URL`, `PAYLOAD_SECRET`, `NEXT_PUBLIC_SERVER_URL` (`http://localhost:3000`),
`PREVIEW_SECRET`. `UPLOADTHING_TOKEN` (media uploads) and `POSTMARK_API_KEY` (careers email) are
optional and only needed to exercise those integrations.

### Non-obvious gotchas

- The `payload` CLI (e.g. `pnpm payload migrate`) does NOT auto-load `.env`. Source it first:
  `set -a; . ./.env; set +a; pnpm payload migrate`. The `seed` script already passes
  `--env-file=.env`, and `next dev`/`next build` load `.env` on their own.
- Apply DB schema with migrations before first run: `set -a; . ./.env; set +a; pnpm payload migrate`.
- Lint is broken out of the box: `pnpm lint` fails under ESLint 9 because the repo still uses a
  legacy `.eslintrc`. Run it with the legacy flag instead:
  `ESLINT_USE_FLAT_CONFIG=false pnpm lint`.
- The first `/admin` request has no users; Payload shows a "create first user" form. Create an admin
  there before using the CMS.
- Start Postgres in a fresh VM if it is not already running: `sudo pg_ctlcluster 16 main start`.
- Sass "legacy JS API" deprecation warnings during dev/build are expected and harmless.
