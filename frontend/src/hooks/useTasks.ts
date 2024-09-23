import { useState, useEffect } from 'react';

export interface Task {
  id: number;
  title: string;
  date: string;
}

export const useTask = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetch('http://localhost:8080/tasks')
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  return { tasks ,setTasks};
};

export default useTask;