# ベースイメージとしてNode.jsを使用
FROM node:18

# 作業ディレクトリを設定
WORKDIR /app

# 依存関係ファイルをコピー
COPY package.json package-lock.json ./

# 依存関係をインストール
RUN yarn install

# アプリケーションのソースコードをコピー
COPY . .

EXPOSE 3000

# 開発サーバーを起動
CMD ["yarn", "dev"]
