import React, { useState } from 'react';

const TaskDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('day');

  const renderContent = () => {
    switch (activeTab) {
      case 'day':
        return <div>Day View</div>;
      case 'week':
        return <div>Week View</div>;
      case 'month':
        return <div>Month View</div>;
      default:
        return null;
    }
  };

  return (
    <div>
      <div>
        <button onClick={() => setActiveTab('day')}>Day</button>
        <button onClick={() => setActiveTab('week')}>Week</button>
        <button onClick={() => setActiveTab('month')}>Month</button>
      </div>
      {renderContent()}
    </div>
  );
};

export default TaskDashboard;
