/**
 * @author Sai Tanuj Karavadi
 * @description This is the frontend for the todo app
 */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

interface Task {
  id: number;
  title: string;
  description: string;
  is_complete: boolean;
}

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');

  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      fetchTasks();
    }
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get('/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
    } catch (error) {
      console.error('error', error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { username, password });
      localStorage.setItem('token', response.data.token);
      setIsLoggedIn(true);
      fetchTasks();
    } catch (error) {
      console.error('error logging in', error);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', { username, password });
      handleLogin(e);
    } catch (error) {
      console.error('reg err', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setTasks([]);
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await api.post(
        '/tasks',
        { title: newTaskTitle, description: newTaskDescription },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewTaskTitle('');
      setNewTaskDescription('');
      fetchTasks();
    } catch (error) {
      console.error('task err', error);
    }
  };

  const handleToggleComplete = async (task: Task) => {
    try {
      const token = localStorage.getItem('token');
      await api.put(
        `/tasks/${task.id}`,
        { ...task, is_complete: !task.is_complete },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTasks();
    } catch (error) {
      console.error('err updating', error);
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      const token = localStorage.getItem('token');
      await api.delete(`/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (error) {
      console.error('err deleting', error);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="container">
        <h1>Todo App</h1>
        <form onSubmit={handleLogin} className="auth-form">
          <input
            className="input-field"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="input-field"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="button">Login</button>
          <button type="button" className="button secondary" onClick={handleRegister}>
            Register
          </button>
        </form>
        <footer className="footer">
          Sai Tanuj Karavadi 2024 <a href="https://github.com/CyanCheetah" target="_blank" rel="noopener noreferrer">@CyanCheetah</a>
        </footer>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Todo List</h1>
        <button onClick={handleLogout} className="button secondary">Logout</button>
      </div>

      <form onSubmit={handleCreateTask} className="task-form">
        <input
          className="input-field"
          type="text"
          placeholder="Task title"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />
        <input
          className="input-field"
          type="text"
          placeholder="Task description"
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
        />
        <button type="submit" className="button">Add Task</button>
      </form>

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            <input
              className="checkbox"
              type="checkbox"
              checked={task.is_complete}
              onChange={() => handleToggleComplete(task)}
            />
            <div className="task-content">
              <h3 className={`task-title ${task.is_complete ? 'completed' : ''}`}>
                {task.title}
              </h3>
              <p className="task-description">{task.description}</p>
            </div>
            <button 
              onClick={() => handleDeleteTask(task.id)}
              className="delete-button"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <footer className="footer">
        Sai Tanuj Karavadi 2024 <a href="https://github.com/CyanCheetah" target="_blank" rel="noopener noreferrer">@CyanCheetah</a>
      </footer>
    </div>
  );
};

export default App; 