import React, { useState,useEffect } from 'react';

interface Task {
  id: number;
  title: string;
  date: string;
}

const TaskDashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTab, setActiveTab] = useState<string>('day');

  useEffect(() => {
    fetch('http://localhost:8080/tasks')
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  const renderTasks = () => {
    return tasks.map(task => (
      <div key={task.id}>
        <h3>{task.title}</h3>
        <p>{task.date}</p>
      </div>
    ));
  };

  // const renderContent = () => {
  //   switch (activeTab) {
  //     case 'day':
  //       return <div>Day View</div>;
  //     case 'week':
  //       return <div>Week View</div>;
  //     case 'month':
  //       return <div>Month View</div>;
  //     default:
  //       return null;
  //   }
  // };

  return (
    <div>
      <div>
        <button onClick={() => setActiveTab('day')}>Day</button>
        <button onClick={() => setActiveTab('week')}>Week</button>
        <button onClick={() => setActiveTab('month')}>Month</button>
      </div>
      <div> 
        {/* {renderContent()} */}
        {renderTasks()}
      </div>
    </div>
  );
};

export default TaskDashboard;
