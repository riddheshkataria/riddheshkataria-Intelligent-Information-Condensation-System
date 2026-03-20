import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import './Dashboard.css';

// Components
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import KeyMetrics from '../../components/metrics/KeyMetrics';
import CircularProgressBar from '../../components/metrics/CircularProgressBar';
import TodoList from '../../components/tasks/TodoList';
import TaskDetailsModal from '../../components/tasks/TaskDetailsModal';
import AddTaskModal from '../../components/tasks/AddTaskModal';
import DocumentManager from '../../components/documents/DocumentManager';
import CalendarView from '../../components/calendar/CalendarView';
import {
    DocumentIcon,
    OverdueIcon,
    PlusIcon,
    TodoIcon,
    WarningIcon,
} from '../../components/icons/Icons';

// Hooks
import { useTasks } from '../../hooks/useTasks';
import { useDocuments } from '../../hooks/useDocuments';

function Dashboard() {
    const {
        tasks,
        error: taskError,
        fetchTasks,
        addTask,
        toggleTask,
        removeTask,
        clearError: clearTaskError,
    } = useTasks();

    const {
        documents,
        error: docError,
        fetchDocuments,
        handleUpload,
        toggleStar,
        clearError: clearDocError,
    } = useDocuments();

    const [selectedTask, setSelectedTask] = useState(null);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const fileInputRef = useRef(null);

    const error = taskError || docError;
    const clearError = useCallback(() => {
        clearTaskError();
        clearDocError();
    }, [clearTaskError, clearDocError]);

    useEffect(() => {
        fetchDocuments();
        fetchTasks();
    }, [fetchDocuments, fetchTasks]);

    const handleToggleTaskStatus = useCallback(
        async (taskId, currentStatus) => {
            await toggleTask(taskId, currentStatus);
            setSelectedTask(null);
        },
        [toggleTask]
    );

    const handleDeleteTask = useCallback(
        async (taskId) => {
            await removeTask(taskId);
            setSelectedTask(null);
        },
        [removeTask]
    );

    const handleAccessDocument = useCallback((documentId) => {
        if (!documentId) {
            alert('No document is linked to this task.');
            return;
        }
        const token = localStorage.getItem('userToken');
        const fileUrl = `http://localhost:5000/api/docs/file/${documentId}`;

        fetch(fileUrl, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => res.blob())
            .then((blob) => window.open(window.URL.createObjectURL(blob)))
            .catch((err) => console.error('Failed to fetch document file:', err));
    }, []);

    const handleOpenAddModal = useCallback(() => setAddModalOpen(true), []);
    const handleCloseAddModal = useCallback(() => setAddModalOpen(false), []);
    const handleCloseDetails = useCallback(() => setSelectedTask(null), []);

    const { overdue, upcoming, completionPercentage } = useMemo(() => {
        const now = new Date();
        let overdueCount = 0;
        let upcomingCount = 0;

        tasks.forEach((task) => {
            if (task.completed || !task.deadline) return;
            const [day, month, year] = task.deadline.split('/');
            const dueDate = new Date(`${year}-${month}-${day}`);
            if (dueDate < now) {
                overdueCount++;
            } else {
                const sevenDays = new Date(now);
                sevenDays.setDate(now.getDate() + 7);
                if (dueDate <= sevenDays) upcomingCount++;
            }
        });

        const completed = tasks.filter((task) => task.completed).length;
        const pct = tasks.length > 0 ? Math.round((completed / tasks.length) * 100) : 0;

        return { overdue: overdueCount, upcoming: upcomingCount, completionPercentage: pct };
    }, [tasks]);

    const completedTasks = useMemo(
        () => tasks.filter((task) => task.completed).length,
        [tasks]
    );
    const pendingTasks = tasks.length - completedTasks;
    const highUrgency = useMemo(
        () => tasks.filter((task) => task.urgency === 'High' && !task.completed).length,
        [tasks]
    );

    const handleJumpToDocuments = useCallback(() => {
        const section = document.querySelector('.document-manager-container');
        if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, []);

    return (
        <div className="dashboard-layout">
            <Header />
            <main className="dashboard-main-content">
                <section className="overview-panel">
                    <div className="overview-copy">
                        <p className="overview-kicker">Operations Intelligence Hub</p>
                        <h1 className="main-title">Operations Dashboard</h1>
                        <p className="main-subtitle">
                            Track priorities, monitor deadlines, and keep documents and execution tightly aligned.
                        </p>
                        <div className="overview-actions">
                            <button type="button" className="overview-btn overview-btn-primary" onClick={handleOpenAddModal}>
                                <PlusIcon />
                                <span>New Task</span>
                            </button>
                            <button type="button" className="overview-btn" onClick={handleJumpToDocuments}>
                                <DocumentIcon />
                                <span>Jump to Documents</span>
                            </button>
                        </div>
                    </div>
                    <div className="overview-stats">
                        <article className="overview-stat">
                            <span className="overview-stat-icon"><TodoIcon /></span>
                            <div>
                                <p className="overview-stat-label">Pending</p>
                                <p className="overview-stat-value">{pendingTasks}</p>
                            </div>
                        </article>
                        <article className="overview-stat">
                            <span className="overview-stat-icon"><WarningIcon /></span>
                            <div>
                                <p className="overview-stat-label">High Urgency</p>
                                <p className="overview-stat-value">{highUrgency}</p>
                            </div>
                        </article>
                        <article className="overview-stat">
                            <span className="overview-stat-icon"><OverdueIcon /></span>
                            <div>
                                <p className="overview-stat-label">Overdue</p>
                                <p className="overview-stat-value">{overdue}</p>
                            </div>
                        </article>
                    </div>
                </section>

                {error && (
                    <button type="button" className="error-banner" onClick={clearError}>
                        <WarningIcon size={18} />
                        <span>{error}</span>
                        <small>Click to dismiss</small>
                    </button>
                )}

                <div className="dashboard-widgets dashboard-section">
                    <KeyMetrics overdue={overdue} upcoming={upcoming} totalDocs={documents.length} />
                    <CircularProgressBar percentage={completionPercentage} />
                </div>

                <section className="main-content-grid dashboard-section">
                    <TodoList tasks={tasks} onTaskClick={setSelectedTask} onAddTaskClick={handleOpenAddModal} />
                    <CalendarView tasks={tasks} />
                </section>

                <DocumentManager
                    documents={documents}
                    toggleStar={toggleStar}
                    onUploadClick={handleUpload}
                />
            </main>
            <Footer />

            <TaskDetailsModal
                task={selectedTask}
                onClose={handleCloseDetails}
                onToggle={
                    selectedTask
                        ? () => handleToggleTaskStatus(selectedTask.id, selectedTask.completed ? 'completed' : 'pending')
                        : undefined
                }
                onAccessDocument={handleAccessDocument}
                onDelete={selectedTask ? () => handleDeleteTask(selectedTask.id) : undefined}
            />

            <AddTaskModal
                isOpen={isAddModalOpen}
                onClose={handleCloseAddModal}
                onAddTask={addTask}
                documents={documents}
            />

            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept=".pdf"
            />
        </div>
    );
}

export default Dashboard;
