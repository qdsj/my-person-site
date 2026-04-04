# 00 Overview

## Goal
Build a bilingual personal brand site with:

- public pages for personal storytelling, projects, media, AI chat, and contact
- a single-admin CMS UI in the frontend
- a NestJS backend for auth, content management, uploads, and AI workflows

## Repo Structure
- `frontend/`: Next.js app router project for public pages and admin screens
- `backend/`: NestJS-style API project for content, auth, uploads, and chat orchestration
- `DocPlan/`: implementation notes and product specs

## Core Experience
- Homepage introduces who you are and routes visitors into projects, media, and AI chat.
- Projects explain your role, outputs, and outcomes.
- Media gives images and video a dedicated presentation layer.
- AI chat acts as a first-person guide based on your published knowledge base.
- Admin consolidates profile editing, project publishing, media management, and knowledge maintenance.

## Delivery Phases
1. Set up monorepo structure and route skeletons.
2. Build the frontend public pages and admin placeholders.
3. Build backend CRUD, auth, upload signing, and AI endpoints.
4. Connect PostgreSQL, `pgvector`, and S3-compatible storage.
5. Replace placeholder content with real data and published workflows.
