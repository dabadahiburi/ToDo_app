package main

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"
	"github.com/rs/cors"
)

// タスクの構造体
type Task struct {
	ID    int    `json:"id"`
	Title string `json:"title"`
	Date  string `json:"date"`
}

var tasks []Task

func init() {
	tasks = []Task{
		{ID: 1, Title: "Task 1", Date: "2024-01-01"},
		{ID: 2, Title: "Task 2", Date: "2024-01-02"},
		{ID: 3, Title: "Task 3", Date: "2024-01-03"},
	}
}

func getTasks(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json") // レスポンスのヘッダーを設定
	json.NewEncoder(w).Encode(tasks)                   // タスクをJSON形式で返す
}

func createTask(w http.ResponseWriter, r *http.Request) {
	var newTask Task                                // 新しいタスクを格納する変数
	err := json.NewDecoder(r.Body).Decode(&newTask) // リクエストボディをデコード
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest) // エラーが発生した場合は400エラーを返す
		return
	}
	// IDを自動生成
	newTask.ID = len(tasks) + 1
	// タスクを追加
	tasks = append(tasks, newTask)
	// 新しいタスクを返す
	json.NewEncoder(w).Encode(newTask)
}

func deleteTask(w http.ResponseWriter, r *http.Request) {
	idStr:= r.URL.Query().Get("id") // URLパラメータからIDを取得
	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest) // エラーが発生した場合は400エラーを返す
		return
	}
	for i, task := range tasks {
		if task.ID == id {
			tasks = append(tasks[:i], tasks[i+1:]...) // タスクを削除
			w.WriteHeader(http.StatusOK)
			return
		}
	}
	http.Error(w, "Task not found", http.StatusNotFound) // タスクが見つからない場合は404エラーを返す
}


func main() {
	// マルチプレクサを作成
	mux := http.NewServeMux()
	mux.HandleFunc("/tasks", getTasks)
	mux.HandleFunc("/tasks/create", createTask)
	mux.HandleFunc("/tasks/delete", deleteTask)

	// CORSミドルウェアを設定
	handler := cors.Default().Handler(mux)

	// サーバーが8080ポートで実行されていることを確認
	log.Println("Server is running on port 8080")
	http.ListenAndServe(":8080", handler)
}
