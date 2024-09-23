import React from "react";

import { Task } from "../components/type/Task";
  
interface DayFilterProps {
  tasks: Task[];
}

// 時間でフィルター
const filterTasksByTime = (tasks: Task[], startHour: number, endHour: number): Task[] => {
  return tasks.filter((task) => {
    const taskDate = new Date(task.date);
    const taskHour = taskDate.getHours();
    return taskHour >= startHour && taskHour < endHour;
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};


const DayFilter: React.FC<DayFilterProps> = ({ tasks }) => {
  const morningTasks = filterTasksByTime(tasks, 9, 12);
  const afternoonTasks = filterTasksByTime(tasks, 12, 17);
  const eveningTasks = filterTasksByTime(tasks, 18, 23);

  return (
    // フィルターを適用したタスクを表示
    <div>
      <h2>Morning</h2>
      {morningTasks.map((task) => (
        <div key={task.id}>{task.title}</div>
      ))}

      <h2>Afternoon</h2>
      {afternoonTasks.map((task) => (
        <div key={task.id}>{task.title}</div>
      ))}

      <h2>Evening</h2>
      {eveningTasks.map((task) => (
        <div key={task.id}>{task.title}</div>
      ))}
    </div>
  );
};

export default DayFilter;