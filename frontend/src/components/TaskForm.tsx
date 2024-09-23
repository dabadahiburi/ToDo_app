import React, { useState } from 'react';

const TaskForm: React.FC = () => {
  const [newTask, setNewTask] = useState({ title: '', date: '', completed: false });

  const createTask = (e: React.FormEvent) => {
    e.preventDefault();
    fetch('http://localhost:8080/tasks/create ', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    })
    .then(response => response.json())
    .then(data => {
      setNewTask({ title: '', date: '', completed: false });
    })
    .catch(error => console.error('Error creating task:', error));
  };


  return (
    <form onSubmit={createTask}>
      <input type="text"
      value={newTask.title}
      onChange={e => setNewTask({ ...newTask, title: e.target.value })}
      placeholder="Task Title"
      required
      />
      <input type="date"
      value={newTask.date}
      onChange={e => setNewTask({ ...newTask, date: e.target.value })}
      required
      />
      <button type="submit">タスク作成</button>
    </form>
  );
};

export default TaskForm;
