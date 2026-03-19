import React, { memo } from 'react';
import { PlusIcon, CheckIcon, getUrgencyClass } from '../icons/Icons';

const TodoList = memo(({ tasks, onTaskClick, onAddTaskClick }) => {
    const now = new Date();

    const isOverdue = (task) => {
        if (task.completed || !task.deadline) return false;
        const [day, month, year] = task.deadline.split('/');
        return new Date(`${year}-${month}-${day}`) < now;
    };

    return (
        <div className="todo-list-container">
            <div className="todo-header">
                <h2>📋 To-Do List</h2>
                <button className="add-task-btn" onClick={onAddTaskClick}>
                    <PlusIcon /> Add Task
                </button>
            </div>
            <div className="todo-grid-header">
                <span>Task</span>
                <span>Deadline</span>
                <span>Urgency</span>
                <span>Document</span>
                <span className="text-right">Status</span>
            </div>
            {tasks.length === 0 ? (
                <div className="empty-state">
                    <span className="empty-icon">📝</span>
                    <p>No tasks yet. Create your first task!</p>
                </div>
            ) : (
                <ul className="todo-grid">
                    {tasks.map((task) => (
                        <li
                            key={task.id}
                            className={`task-row ${task.completed ? 'completed' : ''}`}
                            onClick={() => onTaskClick(task)}
                        >
                            <span className={isOverdue(task) ? 'task-overdue' : 'task-name'}>{task.text}</span>
                            <span className={isOverdue(task) ? 'task-overdue' : 'task-deadline'}>{task.deadline || '—'}</span>
                            <span>
                                <span className={`urgency-badge ${getUrgencyClass(task.urgency)}`}>
                                    {task.urgency || 'Low'}
                                </span>
                            </span>
                            <span className="task-docs">{task.documents || 'None'}</span>
                            <div className="status-dot-container">
                                <span className={`status-dot ${task.completed ? 'completed' : 'incomplete'}`}>
                                    {task.completed && <CheckIcon />}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
});

TodoList.displayName = 'TodoList';
export default TodoList;
