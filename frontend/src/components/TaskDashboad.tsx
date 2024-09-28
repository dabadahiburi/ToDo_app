import React, { useState } from 'react';
import { useTask } from '../hooks/useTasks';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import DayFilter from '../fillters/DayFilter';
import WeeklyFilter from '../fillters/weeklyfilter';
import MonthFilter from '../fillters/MonthFilter';


const TaskDashboard: React.FC = () => {
  const { tasks } = useTask();
  const [activeTab, setActiveTab] = useState('day');
  const [isFormVisible, setIsFormVisible] = useState(false);

  return (
    <div>
      <div className='relative'>
        <button onClick={() => setIsFormVisible(true)}
        className='fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg'>
        タスク作成
        </button>
        {/* タスク作成フォーム */}
        <div
          className={`fixed bottom-0 left-0 right-0 transition-transform duration-300 ${
          isFormVisible ? 'translate-y-0' : 'translate-y-full'
            } bg-white p-4 shadow-lg`}
        >
          <button
            onClick={() => setIsFormVisible(false)}
            className='absolute top-2 right-2 text-gray-500'
          >
            閉じる
          </button>
          <TaskForm />
        </div>
      </div>
      <TaskList />
      <div>
        <button onClick={() => setActiveTab('day')}
        className={`p-2 ${activeTab === 'day' ? 'bg-blue-500 text-white' : 'bg-gray-200'} p-2 rounded-md`}>日付</button>        

        <button onClick={() => setActiveTab('weekly')}
        className={`p-2 ${activeTab === 'weekly' ? 'bg-blue-500 text-white' : 'bg-gray-200'} p  -2 rounded-md`}>週間</button>
        
        <button onClick={()=> setActiveTab('month')}
        className={`p-2 ${activeTab === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-200'} p-2 rounded-md`}>月間</button>
      </div>
      {/* フィルタリング機能追加 */}
      {activeTab === 'day' && <DayFilter tasks={tasks} />}
      {activeTab === 'weekly' && <WeeklyFilter tasks={tasks} />}
      {activeTab === 'month' && <MonthFilter tasks={tasks} />}
    </div>
  );
};

export default TaskDashboard;
