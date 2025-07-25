import React, { useState } from 'react';
import { completeTask } from '../services/api';

const TaskList = ({ tasks, onTaskCompleted }) => {
  const [completingTasks, setCompletingTasks] = useState(new Set());

  const handleComplete = async (taskId) => {
    try {
      setCompletingTasks(prev => new Set([...prev, taskId]));
      await completeTask(taskId);
      onTaskCompleted();
    } catch (error) {
      console.error('Error completing task:', error);
      alert('Failed to complete task. Please try again.');
    } finally {
      setCompletingTasks(prev => {
        const newSet = new Set(prev);
        newSet.delete(taskId);
        return newSet;
      });
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p> No tasks yet. Create your first task above!</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div key={task.id} className="task-card">
          <div className="task-content">
            <h3 className="task-title">{task.title}</h3>
            {task.description && (
              <p className="task-description">{task.description}</p>
            )}
            <div className="task-meta">
              <span className="task-date">
                Created: {new Date(task.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="task-actions">
            <button
              onClick={() => handleComplete(task.id)}
              disabled={completingTasks.has(task.id)}
              className="done-btn"
            >
              {completingTasks.has(task.id) ? 'Completing...' : 'Done ✓'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;