import React from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';


const TaskDashboard: React.FC = () => {
  return (
    <div>
      <TaskForm />
      <TaskList />
    </div>
  );
};

export default TaskDashboard;
