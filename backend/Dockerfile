# バックエンド用のDockerfile
# ベースイメージとしてGo言語のバージョン1.23.0を指定
FROM golang:1.23.0

# 作業ディレクトリを /app に設定
WORKDIR /app

# 依存関係を管理する go.modを作業ディレクトリにコピー
COPY go.mod ./
# 依存関係を管理する go.sum が存在すればコピーする
RUN if [ -f go.sum ]; then cp go.sum .; fi

# go mod download コマンドを実行して依存パッケージをダウンロード
RUN go mod download

# 残りのソースコードを作業ディレクトリにコピー
COPY . .

# コンテナ内で使用するポート8080を外部に公開
EXPOSE 8080

# メインプログラム（main.go）を実行してバックエンドアプリケーションを起動
CMD ["go", "run", "main.go"]
