# v2.17 構造化・第1段階

基準: v2.16 structure-cleanup

変更点:
- index.html 内の37個の inline style を assets/css/site.css に統合
- 実行用 inline JavaScript を assets/js/part-01.js 〜 part-08.js に分離
- JSON-LD（検索エンジン用構造化データ）は index.html 内に維持
- Cloudflare Web Analytics の外部 script はそのまま維持
- worker.js / wrangler.jsonc / robots.txt / sitemap.xml / favicon.ico は v2.16 から維持

目的: 見た目・機能を極力変えず、今後の保守をしやすくする。
