import React from "react";
import { Task } from "../components/type/Task";

interface MonthFilterProps {
  tasks: Task[];
}

// 月ごとにタスクをフィルターする関数
const MonthFilter: React.FC<MonthFilterProps> = ({ tasks }) => {
  const sortedTasks = tasks.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div>
      {sortedTasks.map((task) => (
        <div key={task.id}>{task.title} - {task.date}</div>
      ))}
    </div>
  );
};

export default MonthFilter;
