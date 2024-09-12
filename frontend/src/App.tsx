import React from 'react';
import './App.css';

import TaskDashboard from './components/TaskDashboad';

function App() {
  return (
    <div className="App">
      <h1 className="App-header">タスク管理ダッシュボード</h1>
      <TaskDashboard />
    </div>
  );
}

export default App;
