# ビルドステージ
FROM node:20-alpine as build

WORKDIR /app
COPY package*.json ./

# 依存関係のインストール
RUN npm install

# ソースコードのコピー
COPY . .

# クライアントとサーバーのビルド
RUN npm run build

# 実行ステージ
FROM node:20-alpine

WORKDIR /app
COPY package*.json ./

# 本番環境の依存関係のみインストール
RUN npm install --production

# ビルド成果物のコピー
COPY --from=build /app/dist ./dist

EXPOSE 3000
CMD ["npm", "start"] 