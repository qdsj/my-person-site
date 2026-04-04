# 04 Backend API

## Modules
- `auth`: admin login
- `profile`: public profile read and admin profile update
- `projects`: public project read and admin project management
- `media`: public media read and admin media management
- `knowledge-base`: document CRUD and reindex
- `chat`: public AI reply endpoint
- `upload`: signed upload support for object storage

## Public Endpoints
- `GET /api/v1/public/profile`
- `GET /api/v1/public/projects`
- `GET /api/v1/public/projects/:slug`
- `GET /api/v1/public/media`
- `POST /api/v1/public/chat`

## Admin Endpoints
- `POST /api/v1/auth/login`
- `PATCH /api/v1/admin/profile`
- `POST /api/v1/admin/projects`
- `POST /api/v1/admin/media`
- `GET /api/v1/admin/knowledge-documents`
- `POST /api/v1/admin/knowledge-documents`
- `POST /api/v1/admin/knowledge-documents/:id/reindex`
- `POST /api/v1/admin/uploads/sign`

## Implementation Notes
- Start with placeholder services, then swap in database-backed repositories.
- Put auth, upload validation, and rate limiting behind reusable guards and interceptors.
- Keep AI provider access behind a service boundary so providers remain replaceable.
