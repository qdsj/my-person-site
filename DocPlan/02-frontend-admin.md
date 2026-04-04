# 02 Frontend Admin

## Scope
- `/admin/login`: single-admin sign-in screen
- `/admin`: CMS dashboard entry
- later child screens for profile, projects, media, and knowledge documents

## Responsibilities
- render forms and tables for CRUD workflows
- upload media through backend-signed URLs or backend upload endpoints
- display publish state, locale coverage, and indexing status
- keep auth tokens or session state in a secure cookie flow managed by the backend

## Key Screens
- Profile editor: name, headline, summary, contact links, hero copy
- Project editor: bilingual title, summary, detail blocks, tags, status, sort order
- Media manager: asset type, cover, storage URL, visibility, related project
- Knowledge base manager: FAQ text, personal stories, document upload, reindex trigger

## Notes
- The frontend owns the CMS UX, but all writes should go through the NestJS API.
- v1 is single-admin only; no RBAC or multi-user workflows are planned.
