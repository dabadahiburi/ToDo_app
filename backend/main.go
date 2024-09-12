package main

import (
	"encoding/json"
	"net/http"
)

type Task struct {
	ID    int    `json:"id"`
	Title string `json:"title"`
	Date  string `json:"date"`
}

func getTasks(w http.ResponseWriter, r *http.Request) {
	tasks := []Task{
		{ID: 1, Title: "Task 1", Date: "2024-01-01"},
		{ID: 2, Title: "Task 2", Date: "2024-01-02"},
		{ID: 3, Title: "Task 3", Date: "2024-01-03"},
	}
	json.NewEncoder(w).Encode(tasks)
}

func main() {
	http.HandleFunc("/tasks", getTasks)
	http.ListenAndServe(":8080", nil)
}
