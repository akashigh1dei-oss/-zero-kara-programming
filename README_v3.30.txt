v3.30 パソコン版AI相談室の入口追加（2026年10月8日）

パソコンの上部メニュー「AI相談室」と、ホームの「AIに相談する →」から相談画面を開けます。
増やした用語集700語（説明・使用例）をすべて収録しています。
iPhoneとPCは同じ相談画面・同じAPIを使います。
HELP_AI_ENABLED は true に統一しました。
回数制限は変更していません：同じIP1日10回、全体1日100回、間隔10秒、日本時間0時リセット。

今回差し替えるファイル（リポジトリに同じ場所で上書き）
public/index.html
public/assets/css/site.css
public/assets/js/help-chat.js
wrangler.jsonc
package.json
package-lock.json

worker.js と help-quota.js は今回の変更対象ではありません。既に前回の更新でアップロードしたものを使います。
ZIPそのものではなく、解凍したファイルをそれぞれの場所へアップロードしてください。
GitHubで保存後、Cloudflareの最新デプロイが成功してからPCで Ctrl+Shift+R。
上部の「AI相談室」をクリックして質問を送って確認してください。

検証：内部リンク・サイトマップ27URL・学習22件・編集後記3件のチェック合格、Wrangler dry-run 合格。
ローカル画面テストのAPI回答は模擬回答です。本番AIの回答はアップロード後に確認してください。
