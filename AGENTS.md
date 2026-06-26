# 11ty-reggietheroman — AI Agent Guide

## Project Overview
Personal website built with [Eleventy (11ty)](https://www.11ty.dev/) v3, Handlebars (`.hbs`) templates, and Tailwind CSS v4.

## Architecture

### Layout Chain
```
base.hbs (outer shell: `<html>`, CSS/JS links, `{{{ content }}}`)
  └── home.hbs (adds nav + hero + home-section, `{{{ content }}}`)
        └── page.hbs (the actual page content)
```

- **`src/_layouts/base.hbs`** — Root layout. Includes CSS (`styles.css`), JS (`main.js`), Font Awesome.
- **`src/_layouts/home.hbs`** — Extends `base.hbs`, adds `{{> nav}}`, `{{> home-section}}`.
- **`src/_includes/`** — Partials: `nav.hbs`, `hero.hbs`, `home-section.hbs`, `content.md`. Subdirectory partials use path as name (e.g. `src/_includes/shared/card.hbs` → `{{> shared/card}}`).

### Templating
- **Language**: Handlebars (`.hbs`) — NOT Liquid (despite what README says).
- **Engine**: `@11ty/eleventy-plugin-handlebars`.
- **Markdown** uses Handlebars as its template engine (config: `markdownTemplateEngine: "hbs"`).
- Partials are included with `{{> partialName}}` (no path, no extension).

### CSS
- **Framework**: Tailwind CSS v4 (imported via `@import "tailwindcss"`).
- **Build**: `tailwindcss -i ./src/assets/css/input.css -o ./dist/assets/css/styles.css`.
- **Custom styles**: Add to `src/assets/css/input.css` (theme extensions, base styles, component classes).

### Shortcodes
- **`optimizedImage`** (async): `{% optimizedImage src, alt, widths %}` — generates `<picture>` with AVIF, WebP, JPEG. Source images in `src/`, output in `dist/img/`.
- **`markdown-to-html`**: `{% markdown-to-html "**bold**" %}` — converts Markdown string to HTML server-side. Imported from `src/_shortcodes/markdown-to-html.js`.
- **Location convention**: Shortcode functions live in `src/_shortcodes/` and are imported into `eleventy.config.js`.

### Static Files (SEO)
- Static root files (`robots.txt`, `sitemap.xml`) live in `src/static/` and are mapped to `dist/` root via passthrough copy:
  ```js
  addPassthroughCopy({ "src/static/robots.txt": "/robots.txt", "src/static/sitemap.xml": "/sitemap.xml" })
  ```
- Site is at `reggietheroman.com`. Sitemap referenced in `robots.txt`.

## Commands

| Command | Description |
|---|---|
| `pnpm start` | Dev server with live reload + CSS watch (uses `concurrently`) |
| `pnpm build` | Production build (CSS → 11ty) |
| `pnpm build:css` | Build CSS only |
| `pnpm build:11ty` | Build 11ty site only |

## Directory Structure
```
src/
├── _includes/         # Partials (nav.hbs, hero.hbs, home-section.hbs, content.md)
├── _layouts/          # Layout templates (base.hbs, home.hbs)
├── _shortcodes/       # Shortcode JS functions (optimized-image, markdown-to-html)
├── assets/
│   ├── css/           # Tailwind input CSS
│   ├── js/            # Client JS (passthrough copied to dist/)
│   └── fonts/         # Font files (passthrough copied to dist/)
├── blog/              # Blog index + posts
├── cv/                # CV index + markdown CVs
├── static/            # Static root files (robots.txt, sitemap.xml, .well-known/)
└── index.hbs          # Homepage
.opencode/             # opencode config + memory
Notes.md               # Dev notes (SEO, architecture, etc.)
dist/                  # Built output (gitignored)
```

## Conventions
- **File naming**: Use kebab-case for files and directories.
- **Templates**: Always use `.hbs` extension for Handlebars templates.
- **Frontmatter**: Include `layout` and `title` in every page's frontmatter.
- **Partials**: Reference by name only (`{{> nav}}`), no path or extension.
- **Formatting**: Double quotes in JS config; single quotes in frontmatter where possible.

## Environment
- **Package manager**: pnpm (v10.12.1)
- **Node**: ES modules (`"type": "module"` in package.json)
