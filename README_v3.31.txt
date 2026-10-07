v3.31 Google Gemmaへの切替（2026年10月8日）

AI相談室のモデルを @cf/google/gemma-4-26b-a4b-it に変更。
Gemmaの回答形式 choices[0].message.content に対応。
推論モードを無効化し、回答の最大出力を360トークンに設定。
同一IP 1日10回、サイト全体1日100回、10秒間隔などの制限は継続。

差替え対象：worker.js、package.json、package-lock.json。
このZIPを展開し、既存リポジトリの同名ファイルを置き換えて、通常のデプロイ手順で反映。
Cloudflare上のモデル選択画面の操作だけでは、このサイトのモデルは変わりません。

ローカル検証：JavaScript構文、サイト整合性、AI回答形式とAPI経路を確認。
Cloudflare本番へのデプロイおよびGemmaの実回答は未確認。
参考：https://developers.cloudflare.com/workers-ai/get-started/workers-wrangler/
