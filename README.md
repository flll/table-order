古いAndroidタブレットでブラウザを用いたテーブル注文システム
技術スタック: Vue.js、Ionic Framework、Node.js（Express）、PWA
Dockerコンテナ化し、Cloud Runでデプロイ予定
サーバーサイドではステートレスで、DBに保存しない
注文内容はクライアント側でローカルに保存し、注文確定時にサーバーへ送信
サーバーは注文を受け取り、キッチンプリンターへの印刷などを行う
管理を簡略化するため、コード構成はモノリシック

```
project-root/
├── frontend/                     # フロントエンド（Vue.js + Ionic）
│   ├── public/
│   │   ├── manifest.json        # PWA設定
│   │   ├── icons/              # PWAアイコン
│   │   └── service-worker.js    # PWA用サービスワーカー
│   ├── src/
│   │   ├── main.js             # Vueエントリーポイント
│   │   ├── App.vue             # ルートコンポーネント
│   │   ├── router/             # Vue Router設定
│   │   ├── components/         # 共通コンポーネント
│   │   │   ├── MenuList.vue    # メニュー一覧
│   │   │   ├── OrderCart.vue   # 注文カート
│   │   │   └── OrderConfirm.vue # 注文確認画面
│   │   ├── views/              # ページコンポーネント
│   │   └── store/              # ローカルストレージ管理
│   │       └── order.js        # 注文データの永続化
│   └── package.json
│
├── backend/                      # バックエンド（Express）
│   ├── src/
│   │   ├── index.js            # サーバーエントリーポイント
│   │   ├── routes/             # ルーティング
│   │   │   └── orders.js       # 注文処理API
│   │   └── services/           # ビジネスロジック
│   │       └── printer.js      # キッチンプリンター連携
│   └── package.json
│
├── docker/                      # Docker関連
│   ├── frontend.Dockerfile
│   └── backend.Dockerfile
│
├── docker-compose.yml          # ローカル開発用
└── cloudbuild.yaml            # Cloud Run用ビルド設定
```