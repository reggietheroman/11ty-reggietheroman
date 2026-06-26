# Notes

## SEO

### Sitemap

A [sitemap](https://specification.website/spec/seo/xml-sitemaps/) (`sitemap.xml`) is an XML file that lists all the pages on a website and tells search engines how they relate to each other. It helps crawlers discover content, especially if the site has no deep internal linking or uses client-side rendering.

#### Format

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://reggietheroman.com/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

| Element | Purpose |
|---|---|
| `urlset` | Root element. The `xmlns` attribute declares the sitemap protocol namespace — tells parsers this follows the standard. |
| `url` | A single page entry. Every page gets its own `<url>` block. |
| `loc` | **Location** — the full, absolute URL of the page (including `https://`). This is the only required element. |
| `changefreq` | How often the page content is likely to change. Hint, not a directive. See values below. |
| `priority` | Importance of this page *relative to other pages on the same site*. 0.0 to 1.0. Also just a hint. |

#### changefreq values

| Value | Use case |
|---|---|
| `always` | Live data that changes every access |
| `hourly` | Rapidly updating content |
| `daily` | News, daily blogs |
| `weekly` | Regularly updated sections |
| `monthly` | Standard pages, blog posts (safe default) |
| `yearly` | Static pages, about, CV |
| `never` | Archived, truly static |

#### priority guidelines

- **1.0** — homepage (should be the only 1.0 on the site)
- **0.8** — top-level sections (blog, portfolio)
- **0.6** — sub-pages (individual posts, CV detail)
- **0.0** — least important (tag pages, etc.)

#### Important notes

- Both `changefreq` and `priority` are **hints**, not directives. Google largely ignores both and decides crawl frequency based on observed update patterns and site-wide crawl budget.
- Priority is relative only to other pages on *your* site — it has no effect on cross-site ranking.
- You can have multiple approaches:
  - **Static sitemap** — hand-written XML file, simple but must be updated manually when pages change.
  - **Eleventy plugin** — `@11ty/eleventy-plugin-sitemap` auto-generates the sitemap from your collections/pages at build time.
- If you use `addPassthroughCopy` with a mapping object, static files in `src/` can live anywhere and be remapped to the root of `dist/`:

```js
eleventyConfig.addPassthroughCopy({
  "src/static/sitemap.xml": "/sitemap.xml"
});
```

- Bots look for sitemaps at `https://example.com/sitemap.xml`. You can also reference it in `robots.txt`:
  ```
  Sitemap: https://reggietheroman.com/sitemap.xml
  ```

## robots.txt

Current file at `src/static/robots.txt`:
```
User-agent: *
Disallow: /assets
Allow: /

Sitemap: https://reggietheroman.com/sitemap.xml
```

### Validation notes
- **Disallow: /assets** — blocks `/assets`, `/assets/`, `/assets/css/styles.css`. Also catches `/assets-extra/` — consider `Disallow: /assets/` if directory-only.
- **Allow: /** after `Disallow` — valid per RFC 9309. Most specific rule wins, so `/assets` paths stay blocked.
- **Sitemap** — URL matches deployed sitemap.

## TODO

- [ ] Understand what 11ty's collection pipeline offers (pagination, tags, collection-based loops) — decide if it's worth adopting for blog posts
