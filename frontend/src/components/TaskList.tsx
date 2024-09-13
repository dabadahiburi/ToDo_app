import useTasks from '../hooks/useTasks'; // カスタムフックを利用


const TaskList: React.FC = () => {
  const { tasks,setTasks } = useTasks();

  const deleteTask = (id: number) => {
    fetch(`http://localhost:8080/tasks/delete?id=${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setTasks(tasks.filter(task => task.id !== id)); //
      })
      .catch(error => console.error('Error deleting task:', error));
  };

  const renderTasks = () => {
    return tasks.map(task => (
      <div key={task.id}>
        <h3>{task.title}</h3>
        <p>{task.date}</p>
        <button onClick={() => deleteTask(task.id)}>Delete</button>
      </div>
    ));
  };

  return (
    <div>{renderTasks()}</div>
  );
};

export default TaskList;