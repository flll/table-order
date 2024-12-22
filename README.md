# テーブル注文システム

古いAndroidタブレット向けのテーブル注文システムです。PWA対応で、オフライン動作も可能です。

## 技術スタック

- フロントエンド
  - Vue.js 3 (TypeScript)
  - Ionic Framework
  - Pinia (状態管理)
- バックエンド
  - Node.js
  - Express
- ビルドツール
  - Vite
- テスト
  - Vitest
  - Vue Test Utils

## プロジェクト構造

```
.
├── src/
│   ├── views/          # Vueコンポーネント
│   ├── stores/         # Piniaストア
│   ├── router/         # ルーティング設定
│   ├── server/         # サーバーサイドコード
│   │   ├── controllers/
│   │   ├── printer/    # プリンターサービス
│   │   └── routes/
│   └── shared/         # 共有の型定義など
├── tests/              # テストファイル
└── public/            # 静的ファイル
```

## 機能

- メニュー表示・注文
- カート管理
- 注文履歴表示
- キッチンプリンター連携
- PWA対応（オフライン動作）

## セットアップ

1. 依存関係のインストール
```sh
npm install
```

2. 開発サーバーの起動
```sh
npm run dev
```

3. プロダクションビルド
```sh
npm run build
```

## Docker

```sh
# イメージのビルド
docker build -t table-order .

# コンテナの起動
docker run -p 3000:3000 table-order
```

## 環境変数

- `VITE_API_URL`: APIのベースURL（開発時は`http://localhost:3000`）
- `PRINTER_PORT`: キッチンプリンターのポート（デフォルト: `/dev/usb/lp0`）
- `PORT`: サーバーのポート（デフォルト: 3000）

## テスト

```sh
# ユニットテストの実行
npm run test

# テストカバレッジの確認
npm run test:coverage
```

## 開発ガイドライン

- コンポーネントは`views`ディレクトリに配置
- 共有の型定義は`shared/types.ts`に記述
- テストファイルは`tests`ディレクトリに配置

## ライセンス

MIT
