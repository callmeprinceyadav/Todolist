import React, { useState, useEffect } from 'react';
import './App.css';

const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const [taskInput, setTaskInput] = useState('');

    useEffect(() => {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            setTasks(savedTasks.split(',').map(task => ({ text: task, completed: false })));
        }
    }, []);

    useEffect(() => {
        const taskStrings = tasks.map(task => task.text).join(',');
        localStorage.setItem('tasks', taskStrings);
    }, [tasks]);

    const addTask = () => {
        if (taskInput.trim()) {
            const newTask = { text: taskInput, completed: false };
            setTasks(prevTasks => [...prevTasks, newTask]);
            setTaskInput('');
        }
    };

    const toggleTaskCompletion = (index) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
    };

    const removeTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };

    return (
        <div className="container">
            <h1>Todo List</h1>
            <div className="input-group">
                <input
                    type="text"
                    value={taskInput}
                    onChange={(e) => setTaskInput(e.target.value)}
                    placeholder="Add a new task..."
                />
                <button onClick={addTask}>Add Task</button>
            </div>
            <ul>
                {tasks.map((task, index) => (
                    <li key={index}>
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTaskCompletion(index)}
                        />
                        <label className={task.completed ? 'completed' : ''}>
                            {task.text}
                        </label>
                        <button onClick={() => removeTask(index)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
