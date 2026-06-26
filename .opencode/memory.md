# Project Memory

## Current State
- Personal website built with Eleventy 11ty v3, Handlebars, Tailwind CSS v4.
- Site is functional with blog, CV, and homepage sections.
- Uses `pnpm` as package manager.

## Development
- `pnpm start` runs both 11ty dev server and Tailwind CSS watch in parallel.
- Built output goes to `dist/` (gitignored).

## Architecture Notes
- Layout chain: `base.hbs` → `home.hbs` → page content.
- `markdown.hbs` — extends `base.hbs`, wraps content in `<section id="markdown-container">`. Used by blog post 1.hbs.
- Handlebars partials in `src/_includes/` (supports subdirectories — e.g. `shared/card.hbs` → `{{> shared/card}}`), layouts in `src/_layouts/`.
- Shortcodes in `src/_shortcodes/`, imported into `eleventy.config.js`.
- Tailwind v4 is imported via `@import "tailwindcss"` in `input.css` — no `tailwind.config.js` needed.
- Markdown files use Handlebars as template engine.
- Shortcodes: `{% optimizedImage %}` (async, AVIF/WebP/JPEG) and `{% markdown-to-html %}`.
- Static root files (`robots.txt`, `sitemap.xml`) live in `src/static/` and are remapped to `dist/` root via passthrough copy.
- Site URL: `reggietheroman.com`. Sitemap referenced in `robots.txt`.

## Conventions
- kebab-case for files/directories.
- `.hbs` extension for all Handlebars templates.
- Frontmatter must include `layout` and `title`.
- Double quotes in JS config; single quotes in frontmatter where possible.

## Known Issues / TODOs
- `src/_includes/hero.hbs` has a typo: `subtex t` instead of `subtext` (line 4).
- `src/_includes/content.md` contains only a placeholder (`# CV Content`).
- `src/assets/js/main.js` is empty.
- README incorrectly says "Liquid" instead of Handlebars.
- Blog individual posts (`src/blog/post-1.hbs`) and CV markdown (`src/cv/may-2026.md`) don't generate HTML output — likely missing proper frontmatter or pagination config.

## Past Decisions
- Handlebars chosen over Liquid for template syntax familiarity.
- Tailwind v4 used without separate config file (uses `@import` directive).
- Static root files kept in `src/static/` and remapped via `addPassthroughCopy` with object mapping for cleaner organization.
