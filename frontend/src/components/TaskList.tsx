import React, { useState } from 'react';
import useTasks from '../hooks/useTasks'; // カスタムフックを利用

interface Task{
  id: number;
  title: string;
  date: string;
}

const TaskList: React.FC = () => {
  const { tasks, setTasks } = useTasks();
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const deleteTask = (id: number) => {
    fetch(`http://localhost:8080/tasks/delete?id=${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setTasks(tasks.filter(task => task.id !== id)); //ローカルからTask削除
      })
      .catch(error => console.error('Error deleting task:', error));
  };

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingTask) {
      setEditingTask({ ...editingTask, [e.target.name]: e.target.value });
    }
  };

  const renderTasks = () => {
    return tasks.map(task => (
      <div key={task.id}>
        <h3>{task.title}</h3>
        <p>{task.date}</p>
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