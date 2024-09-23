import React, { useState } from 'react';
import { useTask } from '../hooks/useTasks';
// import TaskList from './TaskList';
import TaskForm from './TaskForm';
import DayFilter from '../fillters/DayFilter';
import WeeklyFilter from '../fillters/weeklyfilter';
import MonthFilter from '../fillters/MonthFilter';


const TaskDashboard: React.FC = () => {
  const { tasks } = useTask();
  const[activeTab, setActiveTab] = useState('day');

  return (
    <div>
      <TaskForm />

      <div>
        <button onClick={()=> setActiveTab('day')}>日付</button>
        <button onClick={()=> setActiveTab('weekly')}>週間</button>
        <button onClick={()=> setActiveTab('month')}>月間</button>
      </div>
      {/* フィルタリング機能追加 */}
      {activeTab === 'day' && <DayFilter tasks={tasks} />}
      {activeTab === 'weekly' && <WeeklyFilter tasks={tasks} />}
      {activeTab === 'month' && <MonthFilter tasks={tasks} />}
      {/* <TaskList /> */}
    </div>
  );
};

export default TaskDashboard;
