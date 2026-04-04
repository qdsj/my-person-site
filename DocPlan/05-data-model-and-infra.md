# 05 Data Model And Infra

## Main Entities
- `AdminUser`: single admin account and password hash
- `Profile`: public personal information and hero copy
- `Project`: bilingual project summary and publish state
- `MediaAsset`: image or video metadata plus storage location
- `KnowledgeDocument`: FAQ or uploaded text source
- `KnowledgeChunk`: chunked text + embedding vector
- `ChatSession`: optional chat history and audit record

## Storage
- PostgreSQL for business entities
- `pgvector` for semantic search
- S3-compatible object storage for images and videos

## Deployment Expectations
- frontend and backend can deploy independently
- backend should expose a stable `/api/v1` base path
- frontend should read `NEXT_PUBLIC_API_BASE_URL` from environment
- object storage credentials and model keys live only in backend env files

## Future Hardening
- add migrations and seed scripts
- add signed URL expiry checks and file validation
- add publish-state filtering and audit trails
- add observability around chat latency, token cost, and retrieval quality
