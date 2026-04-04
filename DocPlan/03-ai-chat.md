# 03 AI Chat

## Product Intent
- Let visitors learn about you through a conversational experience.
- Use first-person language so the AI feels like your digital extension.
- Keep responses grounded in published knowledge documents and project facts.

## Backend Flow
1. Receive `message`, `locale`, and optional `sessionId`.
2. Query published knowledge chunks from PostgreSQL + `pgvector`.
3. Compose a prompt that keeps the assistant in-bounds.
4. Call an OpenAI-compatible chat model.
5. Return the answer plus debug metadata for admin observability.

## Frontend Behavior
- show suggested prompts for common visitor questions
- preserve short chat history in page state
- fall back gracefully when the backend is offline
- keep the page ready to evolve into a persistent session view later

## Guardrails
- do not answer from unpublished content
- say when the knowledge base does not contain enough information
- keep language aligned with the visitor input when possible
- store source hits in admin logs even if public pages do not show citations
