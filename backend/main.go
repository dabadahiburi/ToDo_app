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
	ID        int    `json:"id"`
	Title     string `json:"title"`
	Date      string `json:"date"`
	Completed bool   `json:"completed"`
}

var tasks []Task

func init() {
	tasks = []Task{
		{ID: 1, Title: "Task 1", Date: "2024-01-01", Completed: false},
		{ID: 2, Title: "Task 2", Date: "2024-01-02", Completed: false},
		{ID: 3, Title: "Task 3", Date: "2024-01-03", Completed: false},
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
	idStr := r.URL.Query().Get("id") // URLパラメータからIDを取得
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

func editTask(w http.ResponseWriter, r *http.Request) {
	var editedTask Task
	err := json.NewDecoder(r.Body).Decode(&editedTask)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	for i, task := range tasks {
		if task.ID == editedTask.ID {
			tasks[i].Title = editedTask.Title
			tasks[i].Date = editedTask.Date
			w.WriteHeader(http.StatusOK)
			return
		}
	}
	http.Error(w, "Task not found", http.StatusNotFound) // タスクが見つからない場合は404エラーを返す
}

func updateTaskCOmpletion(w http.ResponseWriter, r *http.Request) {
	idStr := r.URL.Query().Get("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}

	// 更新されたタスク情報を格納するための変数を宣言
	var updatedTask Task
	// リクエストボディをJSONとしてデコードし、updatedTask構造体に格納
	err = json.NewDecoder(r.Body).Decode(&updatedTask)
	if err != nil {
		// デコードエラーが発生した場合、400 Bad Requestエラーを返す
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// タスクリストをループして、指定されたIDのタスクを探す
	for i, task := range tasks {
		if task.ID == id {
			// IDが一致するタスクが見つかった場合、完了状態を更新
			tasks[i].Completed = updatedTask.Completed
			// 更新成功を示すステータスコード200 OKを設定
			w.WriteHeader(http.StatusOK)
			return
		}
	}

	// ループが終了してもタスクが見つからなかった場合、404 Not Foundエラーを返す
	http.Error(w, "Task not found", http.StatusNotFound)
}

func main() {
	// マルチプレクサを作成
	mux := http.NewServeMux()
	mux.HandleFunc("/tasks", getTasks)
	mux.HandleFunc("/tasks/create", createTask)
	mux.HandleFunc("/tasks/delete", deleteTask)
	mux.HandleFunc("/tasks/edit", editTask)
	mux.HandleFunc("/tasks/complete", updateTaskCOmpletion)

	// CORSミドルウェアを設定
	handler := cors.Default().Handler(mux)

	// サーバーが8080ポートで実行されていることを確認
	log.Println("Server is running on port 8080")
	http.ListenAndServe(":8080", handler)
}
