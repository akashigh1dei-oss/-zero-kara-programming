v2.91 — 2026-09-28 — iPhone-friendly upload
The 22 standalone lesson pages are embedded in worker.js. No public/lessons folder needs uploading.
The /lessons/01/ through /lessons/22/ URLs render full HTML directly from the Worker; non-canonical lesson paths redirect to their trailing-slash URLs.
Other assets and routes retain their previous behavior. Unknown URLs are not rewritten to the home page.
To update v2.90 from iPhone: replace worker.js, public/index.html, public/assets/css/site.css and public/sitemap.xml at their existing paths. Updating package.json and package-lock.json keeps the version consistent. Deploy the entire repository with the existing GitHub Action.
Do not upload the ZIP file into the repository as an individual file; unzip and upload the listed files.
