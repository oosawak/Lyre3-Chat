# Lyre3 Chat

Chrome の組み込み AI Prompt API を使った、1画面のチャット雛形です。

## できること

- Prompt API の利用可否チェック
- モデル準備状態の表示
- ダウンロード進捗の表示
- タイトル下・状態・人格設定の折りたたみ
- Gem 風のカスタム人格切り替え
- AIに渡すプロンプトの編集と保存
- 固定キャラの追加と編集
- 物語背景の切り替え
- ゲームマスター型の物語開始
- 1画面チャット UI
- 会話履歴の保存
- 送信中表示
- エラー表示
- 非対応環境でのモック応答切り替え

## 動かし方

1. このフォルダをローカルで開きます。
2. `localhost` で配信します。

たとえば、プロジェクト直下で次のように起動できます。

```bash
python3 -m http.server 4173 --bind 127.0.0.1
```

そのあと、ブラウザで次を開きます。

```text
http://127.0.0.1:4173/
```

## Chrome 側の注意

- Chrome の組み込み AI が有効な環境で動作します。
- 対応していないブラウザでは、モック応答へ自動で切り替わります。
- 初回利用時はモデルのダウンロードや準備に時間がかかることがあります。
- `downloadable` や `downloading` のときは、画面の「モデルを準備」を押して実際の取得を開始します。
- 人格を切り替えたら、モデルをもう一度準備すると新しい指示が反映されます。
- 「AIに渡すプロンプト」は直接編集でき、保存されます。
- `ゲームマスター` を選ぶと、AIが最初の場面を立ち上げるように動きます。

## ファイル構成

- `index.html` 画面本体
- `style.css` 見た目
- `app.js` Prompt API 接続とチャット制御
- `docs/` 企画・設計・運用メモ

## 資料

- [PROJECT_BRIEF.md](./docs/PROJECT_BRIEF.md)
- [SYSTEM_DESIGN.md](./docs/SYSTEM_DESIGN.md)
- [PROMPT_GUIDELINES.md](./docs/PROMPT_GUIDELINES.md)
- [ROADMAP.md](./docs/ROADMAP.md)
