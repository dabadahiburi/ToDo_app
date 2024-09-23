import React, { useState } from 'react';
interface Task {
  title: string; // タイトル
  date: string; // 日付
  time: string; // 時間
  description: string; // 説明
  recurrence: string; // 繰り返しの頻度
  completed: boolean; // 完了フラグ
}



const TaskForm: React.FC = () => {
  const [task, setTask] = useState<Task>({
    title: '',
    date: '',
    time: '',
    description: '',
    recurrence: '',
    completed: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setTask({
      ...task, [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch('http://localhost:8080/tasks/create ', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    })
    .then(response => response.json())
    .then(data => {
      console.log("タスクが作成されました",data);
    })
      .catch(error => {
        console.error("タスク作成エラー",error);
      });
    console.log("タスク作成:",Error);
  };


  return (
    <form onSubmit={handleSubmit} className='p-4 bg-gray-100 rounded-lg shadow-md'>
      <div>
        <label className='block text-gray-700'>タイトル</label>
        <input
          type='text'
          name='title'
          value={task.title}
          onChange={handleChange}
          required
          className='border border-gray-300 p-2 w-full'
        />
      </div>
      <div className='flex'>
        <div className='w-1/2'>
          <label className='block text-gray-700'>期限</label>
          <input
            type='date'
            name='date'
            value={task.date}
            onChange={handleChange}
            required
            className='border border-gray-300 p-2 rounded-lg w-full'
          />
        </div>
        <div className='w-1/2'>
          <label className='block text-gray-700'>時間</label>
          <input
            type='time'
            name='time'
            value={task.time}
            onChange={handleChange}
            required
            className='border border-gray-300 p-2 rounded-lg w-full'
          />
        </div>
      </div>
      <div>
        <label className='block text-gray-700'>詳細</label>
        <textarea
          name='description'
          value={task.description}
          onChange={handleChange}
          required
          className='border border-gray-300 p-2 rounded-lg w-full'
          placeholder='タスクの詳細を入力してください'
        />
      </div>
      <div>
        <label className='block text-gray-700'>周期</label>
        <select
          name='recurrence'
          value={task.recurrence}
          onChange={handleChange}
          required
          className='border border-gray-300 p-2 rounded-lg w-full'
        >
          <option value='none'>なし</option>
          <option value='daily'>毎日</option>
          <option value='weekly'>毎週</option>
          <option value='monthly'>毎月</option>
        </select>
      </div>
      <div className='mt-4'>
        <button
          type='submit'
          className='bg-blue-500 text-white p-2 rounded-lg w-full'
        >
          タスクを作成
        </button>
      </div>
    </form>
  );
};

export default TaskForm;