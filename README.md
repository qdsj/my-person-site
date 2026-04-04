# Personal Site Monorepo

This repository uses a simple monorepo layout:

- `frontend/`: Next.js 16 app-router frontend for the public site and admin UI
- `backend/`: Nest-style API service for auth, content, uploads, and AI chat orchestration
- `DocPlan/`: planning docs for the product, frontend, backend, AI, and infrastructure

## Workspace Commands

Run these from the repository root:

```bash
pnpm dev:web
pnpm dev:api
pnpm build:web
pnpm lint:web
pnpm lint:api
```

## Frontend Routes

- `/`
- `/projects`
- `/projects/[slug]`
- `/media`
- `/chat`
- `/contact`
- `/admin`
- `/admin/login`

## API Shape

- `GET /api/v1/public/profile`
- `GET /api/v1/public/projects`
- `GET /api/v1/public/projects/:slug`
- `GET /api/v1/public/media`
- `POST /api/v1/public/chat`
- `POST /api/v1/auth/login`

## Notes

- The frontend currently uses bilingual mock content so the UI can be developed before the real API is connected.
- The backend currently returns placeholder data and is ready to be wired to PostgreSQL, `pgvector`, and S3-compatible storage.
- See [DocPlan/00-overview.md](./DocPlan/00-overview.md) for the implementation map.
