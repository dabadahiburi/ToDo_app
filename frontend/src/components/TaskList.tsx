import React, { useState } from 'react';
import useTasks from '../hooks/useTasks'; // カスタムフックを利用
import { Task } from "../components/type/Task";


const TaskList: React.FC = () => {
  const { tasks, setTasks } = useTasks();
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // タスクの完了状態を更新
  const toggleTaskCompletion = (task: Task) => {
    const updatedTask = { ...task, completed: !task.completed };
    fetch(`http://localhost:8080/tasks/complete?id=${task.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('サーバーエラーが発生しました');
      }
      return response.json();
    })
    .then(data => {
      console.log('タスク更新成功:', data);
      setTasks(prevTasks => prevTasks.map(t => t.id === task.id ? updatedTask : t));
    })
    .catch(error => {
      console.error('タスク更新エラー:', error);
      // エラーメッセージをユーザーに表示する処理をここに追加
    });
  };

  // タスクを削除
  const deleteTask = (id: number) => {
    fetch(`http://localhost:8080/tasks/delete?id=${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setTasks(tasks.filter(task => task.id !== id)); //ローカルからTask削除
      })
      .catch(error => console.error('Error deleting task:', error));
  };

  // タスクを編集
  const editTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTask) {
      fetch('http://localhost:8080/tasks/edit', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingTask),
      })
        .then(() => {
          setTasks(tasks.map(task => (task.id === editingTask.id ? editingTask : task)));
          setEditingTask(null);
        })
          .catch(error => console.error('Error editing task:', error));
        }
  };

  // タスクの入力フォームの変更
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingTask) {
      setEditingTask({ ...editingTask, [e.target.name]: e.target.value });
    }
  };

  const renderTasks = () => {
    return tasks.map(task => (
      <div key={task.id} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
        <input type="checkbox" checked={task.completed} onChange={() => toggleTaskCompletion(task)} />
        <span>{task.title} - {task.date}</span>
        <button onClick={() => deleteTask(task.id)}>Delete</button>
        <button onClick={() => setEditingTask(task)}>Edit</button>
      </div>
    ));
  };

  return (
    <div>
      {renderTasks()}
      {editingTask && (
        <form onSubmit={editTask}>
        <input
          type="text"
          name="title"
          value={editingTask.title}
          onChange={handleInputChange}
          placeholder="タスク名"
          required
        />
        <input
          type="date"
          name="date"
          value={editingTask.date}
          onChange={handleInputChange}
          required
        />
        <button type="submit">保存</button>
        <button type="button" onClick={() => setEditingTask(null)}>キャンセル</button>
      </form>
      )}
    </div>
  );
};

export default TaskList;