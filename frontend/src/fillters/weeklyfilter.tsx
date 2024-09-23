import React from "react";
import { Task } from "../components/type/Task";

interface WeeklyFilterProps {
  tasks: Task[];
}

// 曜日ごとにタスクをフィルターする関数
const filterTasksByDayOfWeek = (tasks: Task[], datOfWeek: number) => {
  return tasks.filter((task) => {
    const taskDate = new Date(task.date);
    return taskDate.getDay() === datOfWeek;
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

// 曜日ごとにタスクをフィルターして表示するコンポーネント
const WeeklyFilter: React.FC<WeeklyFilterProps> = ({ tasks }) => {
  const daysOfWeek = ['月', '火', '水', '木', '金', '土', '日'];

  return (
    <div>
      {daysOfWeek.map((day, index) => (
        <div key={index}>
          <h2>{day}</h2>
          {filterTasksByDayOfWeek(tasks, index).map((task) => (
            <div key={task.id}>{task.title}</div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default WeeklyFilter;
