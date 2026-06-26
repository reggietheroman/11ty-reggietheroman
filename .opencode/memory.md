# Project Memory

## Current State
- Personal website built with Eleventy 11ty v3, Handlebars, Tailwind CSS v4.
- Site is functional with blog (3 posts), CV, and homepage sections.
- Uses `pnpm` as package manager.
- Most recent commit: homepage and navbar added.

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
- Markdown sources in `src/_content/blog/` (3 posts) and `src/_content/cv/`.

## Conventions
- kebab-case for files/directories.
- `.hbs` extension for all Handlebars templates.
- Frontmatter must include `layout` and `title`.
- Double quotes in JS config; single quotes in frontmatter where possible.

## Known Issues / TODOs
- `src/_includes/hero.hbs` has a typo: `subtex t` instead of `subtext` (line 4). File is also untracked (not yet committed).
- `src/assets/js/main.js` is empty.
- README incorrectly says "Liquid" instead of Handlebars.
- Blog posts and CV content may not generate HTML output — verify frontmatter and 11ty collection config.
- `src/static/.well-known/` directory exists but no passthrough copy is configured for it in `eleventy.config.js`.

## Past Decisions
- Handlebars chosen over Liquid for template syntax familiarity.
- Tailwind v4 used without separate config file (uses `@import` directive).
- Static root files kept in `src/static/` and remapped via `addPassthroughCopy` with object mapping for cleaner organization.
