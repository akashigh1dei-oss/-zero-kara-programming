ゼロから始めるプログラム言語 v2.19 構造化（表示維持版）

目的: 表示・内容・機能を変えず、公開ファイルとWorker設定を分離。
- public/ : 公開するファイルのみ
- public/assets/css/ : CSS
- public/assets/js/ : JavaScript
- worker.js : Cloudflare Worker
- wrangler.jsonc : Cloudflare設定（assets.directory = ./public）
- お問い合わせ機能は今回変更していません（構造化完了後に対応）。
