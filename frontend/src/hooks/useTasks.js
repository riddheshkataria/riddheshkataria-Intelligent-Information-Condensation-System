import { useState, useCallback } from 'react';
import { getTasks, createTask, updateTaskStatus, deleteTask } from '../services/api';

// Formats raw backend task data to the shape the UI expects
const formatTask = (t) => ({
    ...t,
    id: t._id,
    text: t.title,
    completed: t.status === 'completed',
    documents: t.relatedDocument ? t.relatedDocument.originalFilename : 'None',
    relatedDocumentId: t.relatedDocument ? t.relatedDocument._id : null,
});

export const useTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);

    const fetchTasks = useCallback(async () => {
        try {
            const fetched = await getTasks();
            setTasks(fetched.map(formatTask));
        } catch (err) {
            setError(err.message);
        }
    }, []);

    const addTask = useCallback(async (taskData) => {
        try {
            const newTask = await createTask(taskData);
            setTasks((prev) => [formatTask(newTask), ...prev]);
        } catch (err) {
            setError(err.message);
        }
    }, []);

    const toggleTask = useCallback(async (taskId, currentStatus) => {
        const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
        try {
            await updateTaskStatus(taskId, newStatus);
            setTasks((prev) =>
                prev.map((task) =>
                    task.id === taskId
                        ? { ...task, status: newStatus, completed: newStatus === 'completed' }
                        : task
                )
            );
        } catch (err) {
            setError(err.message);
        }
    }, []);

    const removeTask = useCallback(async (taskId) => {
        try {
            await deleteTask(taskId);
            setTasks((prev) => prev.filter((task) => task.id !== taskId));
        } catch (err) {
            setError(err.message);
        }
    }, []);

    const clearError = useCallback(() => setError(null), []);

    return {
        tasks,
        error,
        fetchTasks,
        addTask,
        toggleTask,
        removeTask,
        clearError,
    };
};
