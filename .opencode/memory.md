# Project Memory

## Current State
- Personal website built with Eleventy 11ty v3, Handlebars, Tailwind CSS v4, DaisyUI.
- Site is functional with blog (3 posts), CV, and homepage sections.
- Uses `pnpm` as package manager.
- Blog posts use date-based routing (`/blog/2026/06/05/slug`).
- Deployed on Netlify with security headers in `netlify.toml`.

## Development
- `pnpm start` runs both 11ty dev server and Tailwind CSS watch in parallel.
- Built output goes to `dist/` (gitignored).

## Architecture Notes
- Layout chain: `base.hbs` → `home.hbs` → page content. Also: `base.hbs` → `markdown.hbs` → blog post content.
- Handlebars partials in `src/_includes/` (supports subdirectories — e.g. `shared/card.hbs` → `{{> shared/card}}`): `nav.hbs`, `hero.hbs`, `home-section.hbs`, `technologies.hbs`.
- Layouts in `src/_layouts/`: `base.hbs`, `home.hbs`, `markdown.hbs`.
- Shortcodes in `src/_shortcodes/`, imported into `eleventy.config.js`.
- Tailwind v4 is imported via `@import "tailwindcss"` in `input.css` — no `tailwind.config.js` needed.
- Markdown files use Handlebars as template engine.
- Shortcodes: `{% optimizedImage %}` (async, AVIF/WebP/JPEG) and `{% markdown-to-html %}`.
- Static root files (`robots.txt`, `sitemap.xml`) live in `src/static/` and are remapped to `dist/` root via passthrough copy.
- Site URL: `reggietheroman.com`. Sitemap referenced in `robots.txt`.
- Markdown sources in `src/_content/blog/` (date-subdirectories: `2026/06/05/`, `2026/06/21/`) and `src/_content/cv/`.
- Blog `.hbs` pages mirror the date structure: `src/blog/2026/06/05/slug.hbs`.
- Blog posts use `{{markdown-to-html '../path/to/file.md'}}` to pull in markdown content.
- Deployment: Netlify (`netlify.toml` configures COOP/COEP security headers).

## Conventions
- kebab-case for files/directories.
- `.hbs` extension for all Handlebars templates.
- Frontmatter must include `layout` and `title`.
- Double quotes in JS config; single quotes in frontmatter where possible.

## Known Issues / TODOs
- `src/assets/js/main.js` is empty.
- `src/static/.well-known/` directory exists but no passthrough copy is configured for it in `eleventy.config.js`.

## Past Decisions
- Handlebars chosen over Liquid for template syntax familiarity.
- Tailwind v4 used without separate config file (uses `@import` directive).
- Static root files kept in `src/static/` and remapped via `addPassthroughCopy` with object mapping for cleaner organization.
