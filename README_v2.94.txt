v2.94 — 2026-09-28 — mmdei.com canonical SEO fix

SEO changes:
- Home canonical, og:url and WebSite structured-data URL now use https://mmdei.com/.
- Lesson canonical URLs /lessons/01/ through /lessons/22/ now use https://mmdei.com/lessons/NN/.
- sitemap.xml URLs now use https://mmdei.com/.
- robots.txt Sitemap now points to https://mmdei.com/sitemap.xml.
- worker.js redirects the workers.dev host, www.mmdei.com, and HTTP requests to the same path/query on https://mmdei.com with HTTP 301.

Important: deploy and verify the live site before requesting indexing in Search Console.
