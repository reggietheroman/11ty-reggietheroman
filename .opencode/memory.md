# Project Memory

## Current State
- Personal website at reggietheroman.com — Eleventy v3, Handlebars, Tailwind CSS v4, DaisyUI (`coffee` theme).
- Pages: Home, Blog (3 posts), Notes (3 notes), CV, Projects, About.
- Uses `pnpm` as package manager. Output in `dist/` (gitignored).
- Deployed on Netlify (`netlify.toml` — security headers, asset caching).

## Development
- `pnpm start` — 11ty dev server + Tailwind CSS watch (concurrently).
- `pnpm build` — production build (CSS then 11ty).

## Architecture
- Layout chain: `base.hbs` → `home.hbs` (homepage) or `markdown.hbs` (blog/about).
- Partials: `nav`, `home-section`, `technologies`, `card`, `note-card`, `hero`, `hero-w-figure`.
- Collections: `tags: blogs` → blog index; `tags: notes` → notes index.
- Blog posts are single `.md` files at `src/blog/YYYY/MM/DD/slug.md` with date-based URLs.
- Notes are `.md` files in `src/notes/` — rendered inline on index, no detail pages.
- CV body in `src/_content/cv/content.md` (excluded via `.eleventyignore`), pulled via `markdown-to-html`.
- Shortcodes: `optimizedImage`, `markdown-to-html`, `remainder`, `to-reversed`, `to-readable-date`.
- Static files in `src/static/` remapped to dist root via passthrough copy.

## Conventions
- kebab-case files/directories, `.hbs` for templates.
- Frontmatter must include `layout` and `title`.
- Double quotes in JS config; single quotes in frontmatter.

## Known Issues
- See `systems-research/AGENT_FEEDBACK.md` for full list.
- Sitemap is static and missing several pages.
- No meta/OG tags, 404 page, favicon, or RSS feed.
- `main.js` is empty. Font Awesome loads full library.

## AI Assistant Files
- `AGENTS.md` — primary agent guide (architecture, content, commands).
- `.cursor/rules/` — Cursor-specific rules (project, handlebars, content).
- `systems-research/` — PLAN.md, AGENT_FEEDBACK.md, TIMELINE.md.
