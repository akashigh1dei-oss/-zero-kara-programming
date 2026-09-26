zero-kara-public v2.87
Date: 2026-09-27

Learning navigation rebuilt from the 22 entries in 学習一覧. Every lesson page now has one footer with the current lesson and page, page numbers where needed, previous and next buttons, and a 学習一覧に戻る button. The redundant generated top navigation and older footer navigation are removed at runtime. The last page of each lesson continues to the next lesson. The final page is labeled as the final page. The top page layout remains scoped as in v2.86.

Deployment: replace the entire project with the ZIP contents, preserving paths. The public/index.html and public/assets/css/site.css and public/assets/js/part-08.js files all changed; uploading only one of them will leave old navigation or cached styles.
