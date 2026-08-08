# 11ty-reggietheroman — AI Agent Guide

## Project Overview
Personal website at [reggietheroman.com](https://reggietheroman.com) built with [Eleventy (11ty)](https://www.11ty.dev/) v3, Handlebars (`.hbs`) templates, Tailwind CSS v4, and [DaisyUI](https://daisyui.com/) components.

## Architecture

### Layout Chain
```
base.hbs (outer shell: <html>, CSS/JS links, nav, {{{ content }}})
  ├── home.hbs (wraps homepage content + home-section + technologies partials)
  └── markdown.hbs (wraps content in <section id="markdown-container" class="prose">)
```

- **`src/_layouts/base.hbs`** — Root layout. Preloads CSS, loads `main.js` and Font Awesome, renders `{{> nav}}`.
- **`src/_layouts/home.hbs`** — Extends `base.hbs`. Used by homepage only. Appends `home-section` and `technologies` partials after page content.
- **`src/_layouts/markdown.hbs`** — Extends `base.hbs`. Used by blog posts, about page, and any Markdown-first content.

There is no `post.hbs` layout. Blog posts use `markdown.hbs` directly via frontmatter.

### Pages & Routes

| Route | Source | Layout | Notes |
|---|---|---|---|
| `/` | `src/index.hbs` | `home.hbs` | Intro text + contact/tech sections |
| `/blog/` | `src/blog/index.hbs` | `base.hbs` | Lists `collections.blogs` via `card` partial |
| `/blog/YYYY/MM/DD/slug/` | `src/blog/YYYY/MM/DD/*.md` | `markdown.hbs` | Date-based permalinks from file path |
| `/notes/` | `src/notes/index.hbs` | `base.hbs` | Lists `collections.notes` via `note-card` partial |
| `/notes/slug/` | `src/notes/*.md` | *(none — index only)* | Notes render inline on index, not as separate pages |
| `/cv/` | `src/cv/index.hbs` | `base.hbs` | Pulls CV body from `_content/cv/content.md` |
| `/projects/` | `src/projects/index.hbs` | `base.hbs` | Static project cards via `card` partial |
| `/about/` | `src/about/index.md` | `markdown.hbs` | Markdown page |

### Collections
11ty tag-based collections drive list pages:

- **`blogs`** — any file with `tags: blogs` in frontmatter (blog `.md` files under `src/blog/`)
- **`notes`** — any file with `tags: notes` in frontmatter (note `.md` files under `src/notes/`)

List pages reverse collections with the `to-reversed` shortcode and alternate card colors with the `remainder` shortcode.

### Partials (`src/_includes/`)

| Partial | Purpose |
|---|---|
| `nav.hbs` | Responsive navbar (mobile dropdown + desktop menu) |
| `home-section.hbs` | Contact info and social links on homepage |
| `technologies.hbs` | Skills/tech collapsible sections on homepage |
| `card.hbs` | DaisyUI card for blog index and projects page |
| `note-card.hbs` | Card that renders note body inline (notes have no detail pages) |
| `hero.hbs` | Hero section (unused on current pages) |
| `hero-w-figure.hbs` | Hero with image (unused on current pages) |

Subdirectory partials use path as name: `src/_includes/shared/foo.hbs` → `{{> shared/foo}}`.

### Templating
- **Language**: Handlebars (`.hbs`).
- **Engine**: `@11ty/eleventy-plugin-handlebars`.
- **Markdown** uses Handlebars as its template engine (`markdownTemplateEngine: "hbs"`).
- Partials: `{{> partialName}}` (no path, no extension).
- Triple braces `{{{ content }}}` for unescaped HTML output.

### CSS & Theming
- **Framework**: Tailwind CSS v4 via `@import "tailwindcss"` in `src/assets/css/input.css`.
- **Plugins**: `@tailwindcss/typography` (prose classes), DaisyUI (`coffee` theme, default).
- **Build**: `tailwindcss -i ./src/assets/css/input.css -o ./dist/assets/css/styles.css`.
- **Custom styles**: Add to `input.css` (theme extensions, base styles, component classes).
- No `tailwind.config.js` — configuration is CSS-first.

### Shortcodes

| Shortcode | Type | Usage |
|---|---|---|
| `optimizedImage` | async | `{% optimizedImage src, alt, widths %}` — AVIF/WebP/JPEG `<picture>`. Output: `dist/img/`. |
| `markdown-to-html` | sync | `{% markdown-to-html '../relative/path.md' %}` — reads markdown from disk. Used by CV page. |
| `remainder` | sync | `{% remainder @index 2 %}` — alternates card primary/secondary colors. |
| `to-reversed` | sync | `{% to-reversed collections 'blogs' %}` — reverses a collection for newest-first display. |
| `to-readable-date` | sync | `{% to-readable-date date %}` — formats dates (Asia/Manila timezone). Used by `note-card`. |

Shortcode functions live in `src/_shortcodes/` and are registered in `eleventy.config.js`.

**Path note**: `markdown-to-html` resolves paths relative to `src/_shortcodes/`, not the calling template. CV uses `../_content/cv/content.md`.

### Static Files & SEO
- Static root files (`robots.txt`, `sitemap.xml`) live in `src/static/` and are mapped to `dist/` root via passthrough copy.
- Sitemap is **hand-written** and currently missing `/notes/`, `/about/`, and individual blog post URLs. See `systems-research/AGENT_FEEDBACK.md`.
- Font Awesome JS bundle is passthrough-copied from `node_modules` to `/assets/js/fontawesome.js`.
- CV PDF is passthrough-copied from `src/assets/`.

## Content Guide

### Adding a Blog Post
Create a single `.md` file at `src/blog/YYYY/MM/DD/slug.md`:

```yaml
---
tags: blogs
layout: markdown.hbs
title: ReggieTheRoman | Display Title
shortTitle: Short Title for Card
tldr: One-line summary for the blog index card.
cardDate: Month D, YYYY
---

# Post Title

Post body in Markdown...
```

The file path determines the URL. No paired `.hbs` file needed.

### Adding a Note
Create a `.md` file in `src/notes/` with a numeric prefix for ordering (e.g., `003-my-note.md`):

```yaml
---
tags: notes
title: Note Title
date: 2026-08-08
---

Note body in Markdown. Rendered inline on the notes index — no separate detail page.
```

Every note **must** have `tags: notes` frontmatter or it won't appear in the collection.

### Updating the CV
Edit `src/_content/cv/content.md`. The CV page at `src/cv/index.hbs` pulls it in via `markdown-to-html`. Replace the PDF at `src/assets/Reginald_Bigornia_Senior_FullStack_Engineer.pdf` and keep the passthrough copy path in `eleventy.config.js` in sync.

### Adding a Project
Edit `src/projects/index.hbs` — add another `{{> card ...}}` block with title, content, buttonLink, and optional `openNew=true`.

### Adding a Page
1. Create the page file under `src/` (`.hbs` or `.md`).
2. Set `layout` and `title` in frontmatter.
3. Add a nav link in `src/_includes/nav.hbs` (both mobile dropdown and desktop menu).
4. Add the URL to `src/static/sitemap.xml`.

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
├── _content/          # Raw markdown excluded from 11ty (CV body only)
├── _includes/         # Handlebars partials
├── _layouts/          # Layout templates (base, home, markdown)
├── _shortcodes/       # Shortcode JS functions
├── about/             # About page (index.md)
├── assets/
│   ├── css/           # Tailwind input CSS
│   ├── js/            # Client JS (passthrough copied)
│   └── fonts/         # Font files (passthrough copied)
├── blog/              # Blog index + date-routed posts (*.md)
├── cv/                # CV page (index.hbs)
├── notes/             # Notes index + note files (*.md)
├── projects/          # Projects page (index.hbs)
├── static/            # robots.txt, sitemap.xml, .well-known/
└── index.hbs          # Homepage
.eleventyignore        # Excludes src/_content/ from 11ty processing
eleventy.config.js     # 11ty config, shortcodes, passthrough copy
netlify.toml           # Netlify deployment headers
wrangler.toml          # Cloudflare Pages config (eleventy-daisy starter)
.opencode/             # OpenCode config + memory
Notes.md               # Dev notes (SEO, architecture, etc.)
systems-research/      # Build plan, critical review, and project timeline
dist/                  # Built output (gitignored)
```

### systems-research/

Documentation about the system itself — useful for understanding architecture decisions and known issues.

| File | Description |
|---|---|
| `PLAN.md` | Step-by-step build plan. Use to understand *how* the system was built. |
| `AGENT_FEEDBACK.md` | Critical review by severity (bugs, SEO, performance, accessibility). Use to understand *what's wrong* and what to fix first. |
| `TIMELINE.md` | Chronological development history from git. Use to understand *when* things were added and why. |

## Deployment
- **Production**: Netlify (`netlify.toml` — security headers, aggressive caching for `/assets/*` and `/img/*`).
- **Cloudflare Pages**: `wrangler.toml` exists for the eleventy-daisy starter template; not the primary deploy target for this site.

## Conventions
- **File naming**: kebab-case for files and directories.
- **Templates**: Always use `.hbs` extension for Handlebars templates.
- **Frontmatter**: Include `layout` and `title` in every page's frontmatter.
- **Partials**: Reference by name only (`{{> nav}}`), no path or extension.
- **Formatting**: Double quotes in JS config; single quotes in frontmatter where possible.
- **Blog dates**: Use date-based directory structure (`YYYY/MM/DD/`) for permalink routing.
- **Note ordering**: Prefix note filenames with zero-padded numbers (`000-`, `001-`, …).

## Environment
- **Package manager**: pnpm (v10.12.1)
- **Node**: ES modules (`"type": "module"` in package.json)

## Known Issues
See `systems-research/AGENT_FEEDBACK.md` for the full list. High-priority items:
- No meta tags / Open Graph in `base.hbs`
- Sitemap is static and incomplete
- No 404 page, favicon, or RSS feed
- Font Awesome loads the full library on every page
- `main.js` is empty but loaded on every page
