# テーブル注文システム

古いAndroidタブレット向けのテーブル注文システムです。PWA対応で、オフライン動作も可能です。

## プロジェクトの概要

このシステムは、レストランでの注文プロセスを効率化するために開発された、モダンなテーブルオーダーシステムです。
以下の特徴を持っています：

- **オフライン対応**: PWA（Progressive Web App）として実装されており、インターネット接続が不安定な環境でも動作
- **レガシーデバイス対応**: 古いAndroidタブレットでも快適に動作するよう最適化
- **リアルタイム注文処理**: 注文が入ると即座にキッチンプリンターに出力
- **使いやすいUI**: Ionic Frameworkを使用した、モダンでレスポンシブなデザイン
- **堅牢な設計**: TypeScriptによる型安全性と、包括的なテストカバレッジ

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
├── src/                       # ソースコードのルートディレクトリ
│   ├── views/                 # 画面コンポーネント
│   │   ├── MenuPage.vue        # メニュー表示画面
│   │   ├── CartPage.vue        # 注文カート画面
│   │   ├── OrdersPage.vue      # 注文履歴・管理画面
│   │   └── TabsPage.vue        # タブナビゲーション
│   ├── stores/                # 状態管理（Pinia）
│   │   └── order.ts            # 注文関連の状態管理
│   ├── router/                # ルーティング設定
│   │   └── index.ts            # ルート定義
│   ├── server/                # サーバーサイドコード
│   │   ├── controllers/       # ビジネスロジック
│   │   │   └── order.controller.ts  # 注文処理
│   │   ├── printer/         # プリンター関連
│   │   │   └── printer.service.ts   # プリンター制御
│   │   ├── routes/          # APIルート
│   │   │   └── api.ts       # エンドポイント定義
│   │   └── server.ts        # サーバーのエントリーポイント
│   ├── shared/              # 共有リソース
│   │   └── types.ts         # 共有の型定義
│   ├── env.d.ts             # 環境変数の型定義
│   └── main.ts              # フロントエンドのエントリーポイント
├── tests/                   # テストファイル
│   ├── setup.ts             # テスト環境設定
│   ├── stores/              # ストアのテスト
│   │   └── order.spec.ts    # 注文状態のテスト
│   └── views/               # 画面のテスト
│       ├── CartPage.spec.ts
│       ├── MenuPage.spec.ts
│       └── OrdersPage.spec.ts
├── public/               # 静的ファイル
│   └── index.html         # エントリーポイントHTML
├── Dockerfile             # コンテナ化設定
├── tsconfig.json          # TypeScript基本設定
├── tsconfig.node.json     # Node.js用TS設定
├── tsconfig.server.json   # サーバー用TS設定
├── vite.config.ts         # Vite設定
└── vitest.config.ts       # テスト設定
```

### 主要ディレクトリの説明

#### `src/views/`
フロントエンドの画面コンポーネントを格納。各画面は独立したVueコンポーネントとして実装されています。

#### `src/stores/`
Piniaを使用した状態管理ストアを配置。注文データやカートの状態などを管理します。

#### `src/server/`
バックエンドのコードを格納：
- `controllers/`: ビジネスロジックの実装
- `printer/`: キッチンプリンター制御関連の実装
- `routes/`: APIエンドポイントの定義

#### `src/shared/`
フロントエンドとバックエンドで共有する型定義やユーティリティを配置。

#### `tests/`
ユニットテストとコンポーネントテストを配置：
- `views/`: 各画面コンポーネントのテスト
- `stores/`: 状態管理のテスト
- `setup.ts`: テスト環境の共通設定

## 機能

- メニュー表示・注文
- カート管理
- 注文履歴表示
- キッチンプリンター連携
- PWA対応（オフライン動作）
- コンテナ化

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

## 開発環境のセットアップ

### 推奨要件

- Node.js 22以上
- npm 10以上
- USBプリンター（開発時はオプション）

### 推奨開発ツール

- Visual Studio Code
- Vue.js Devtools
- Vue Language Features (Volar)
- TypeScript Vue Plugin (Volar)

### デバッグ

開発時は以下のコマンドが利用可能です：

```sh
# 開発サーバーの起動（ホットリロード対応）
npm run dev

# 型チェック
npm run type-check

# リントチェック
npm run lint

# 自動フォーマット
npm run format
```

## ライセンス

MIT
