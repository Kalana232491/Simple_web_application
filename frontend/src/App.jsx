import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { getTasks } from './services/api';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskCreated = () => {
    fetchTasks();
  };

  const handleTaskCompleted = () => {
    fetchTasks();
  };

  return (
    <div className="app">
      <div className="container">
        <header className="app-header">
          <h1>Add a Task</h1>
        </header>
        
        <main className="app-main">
          <section className="task-form-section">
            <TaskForm onTaskCreated={handleTaskCreated} />
          </section>
          
          <section className="task-list-section">
            <h2>Recent Tasks</h2>
            {loading ? (
              <div className="loading">Loading tasks...</div>
            ) : (
              <TaskList tasks={tasks} onTaskCompleted={handleTaskCompleted} />
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;