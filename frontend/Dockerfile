# フロントエンド用のDockerfile
# ベースイメージとしてNode.jsのバージョン22.8.0を指定
FROM node:22.8.0

# 作業ディレクトリを /app に設定
WORKDIR /app

# package.json と package-lock.json を作業ディレクトリにコピー
# （依存関係を先にインストールするため）
COPY package*.json ./

# npm を使用して依存パッケージをインストール
RUN npm install

# 残りのソースコードを作業ディレクトリにコピー
COPY . .

# コンテナ内で使用するポート3000を外部に公開
EXPOSE 3000

# npm start コマンドでアプリケーションを起動
CMD ["npm", "start"]