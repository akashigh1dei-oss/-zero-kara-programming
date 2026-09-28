v3.11（2026-09-29）
「困ったとき」に、追加質問ができる双方向AI相談室を準備しました。会話の表示は開いている画面内だけです。質問本文はサイトのアクセスログへ出しません。

安全のためAI相談は初期状態でオフです。画面には「準備中」と表示します。公開後、費用と無料枠を確認し、wrangler.jsonc の vars.HELP_AI_ENABLED を "true" に変更してデプロイすると利用できます。Cloudflare Workers AIとRate Limitingのbindingは設定済みです。相談APIは準備中でも404にならず、状態を明示します。

差し替え：public/index.html、public/assets/css/site.css、public/assets/js/help-chat.js（新規）、worker.js、wrangler.jsonc。ZIP全体を同じ階層に配置すれば新しいJSも含まれます。
AIの実際の回答と公開環境での動作は、有効化後に確認してください。
