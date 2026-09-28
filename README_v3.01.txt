v3.01 接続・ボタン統一修正版（2026-09-29）

修正内容：
- 編集後記51〜53の下部ナビを「戻る・メイン・進む」の3ボタンに統一
- 3ボタンを同じ高さ・同じ書式で横並びに統一（iPhone対応）
- /#editorialIndex で戻った際にホームへ飛んでしまう起動処理を修正
- 編集後記の「メイン」は編集後記一覧へ正しく戻るよう統一
- CSSキャッシュ番号を v3.01 に更新
- 画面バージョン表示を v3.01 に更新

GitHubで差し替える主なファイル：
  worker.js
  public/index.html
  public/assets/js/part-01.js
  package.json
  package-lock.json

public/assets/css/site.css は内容変更なし（index側のキャッシュ番号のみ更新）。
