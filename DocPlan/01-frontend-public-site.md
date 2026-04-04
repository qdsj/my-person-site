# 01 Frontend Public Site

## Routes
- `/`: hero, profile summary, featured highlights, featured projects
- `/projects`: project listing
- `/projects/[slug]`: project detail
- `/media`: image and video showcase
- `/chat`: AI persona conversation
- `/contact`: contact information and collaboration intent

## UX Priorities
- Present a clear narrative about who you are before asking visitors to explore deeper.
- Keep bilingual switching simple and available globally.
- Make AI chat visible but not the only discovery path.
- Let every page reinforce the same identity and visual system.

## Data Contracts
- Public pages should eventually fetch from NestJS public endpoints.
- Until the backend is live, the frontend uses local bilingual mock data.
- All display content should be modeled with `zh/en` fields so the switcher stays predictable.

## Later Enhancements
- Add locale-aware metadata and per-page SEO fields.
- Replace placeholder media cards with remote images and streaming video.
- Add analytics, structured data, and published content filters.
