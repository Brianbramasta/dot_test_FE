'use client';
import { useState } from 'react';
import { InputField } from '@/components/InputField/InputField';
import { CustomButton } from '@/components/CustomButton/CustomButton';
import styles from './page.module.css';

interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export default function TaskManagement() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState('');

  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, {
        id: Date.now().toString(),
        text: input.trim(),
        completed: false,
        createdAt: new Date()
      }]);
      setInput('');
    }
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const activeTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className={styles.container}>
      <h1>Task Manager</h1>
      
      <div className={styles.inputSection}>
        <InputField
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              addTask();
            }
          }}
          placeholder="Add new task..."
        />
        <CustomButton onClick={addTask} variant="primary">
          Add Task
        </CustomButton>
      </div>

      <div className={styles.taskLists}>
        <div className={styles.taskGroup}>
          <h2>Active Tasks ({activeTasks.length})</h2>
          {activeTasks.map(task => (
            <div key={task.id} className={styles.taskItem}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />
              <span>{task.text}</span>
              <CustomButton onClick={() => deleteTask(task.id)} variant="secondary">
                Delete
              </CustomButton>
            </div>
          ))}
        </div>

        <div className={styles.taskGroup}>
          <h2>Completed Tasks ({completedTasks.length})</h2>
          {completedTasks.map(task => (
            <div key={task.id} className={`${styles.taskItem} ${styles.completed}`}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />
              <span>{task.text}</span>
              <CustomButton onClick={() => deleteTask(task.id)} variant="secondary">
                Delete
              </CustomButton>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}