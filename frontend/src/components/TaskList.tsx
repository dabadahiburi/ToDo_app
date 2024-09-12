import useTasks from '../hooks/useTasks'; // カスタムフックを利用


const TaskList: React.FC = () => {
  const { tasks } = useTasks();

  const renderTasks = () => {
    return tasks.map(task => (
      <div key={task.id}>
        <h3>{task.title}</h3>
        <p>{task.date}</p>
      </div>
    ));
  };

  return (
    <div>{renderTasks()}</div>
  );
};

export default TaskList;