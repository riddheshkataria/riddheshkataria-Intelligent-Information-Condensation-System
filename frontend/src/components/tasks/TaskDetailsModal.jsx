import React from 'react';
import { CloseIcon, TrashIcon, getUrgencyClass } from '../icons/Icons';

const TaskDetailsModal = ({ task, onClose, onToggle, onAccessDocument, onDelete }) => {
    if (!task) return null;

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content details-modal" onClick={(e) => e.stopPropagation()}>
                <div className="details-modal-header">
                    <h2>{task.text}</h2>
                    <button className="btn-close" onClick={onClose}><CloseIcon /></button>
                </div>
                <div className="details-modal-body">
                    <p><strong>Description:</strong> {task.description || 'No description provided.'}</p>
                    <p><strong>Deadline:</strong> {task.deadline || 'No deadline set'}</p>
                    <div className="detail-row">
                        <strong>Urgency:</strong>
                        <span className={`urgency-badge ${getUrgencyClass(task.urgency)}`}>{task.urgency || 'Low'}</span>
                    </div>
                    <div className="detail-row">
                        <strong>Status:</strong>
                        <span className={`status-badge ${task.completed ? 'status-completed' : 'status-pending'}`}>
                            {task.completed ? '✓ Completed' : '⏳ Pending'}
                        </span>
                    </div>
                </div>
                <div className="details-modal-footer">
                    <button
                        className={`btn-toggle-status ${task.completed ? 'btn-undo' : 'btn-complete'}`}
                        onClick={(e) => { e.stopPropagation(); onToggle(); }}
                    >
                        {task.completed ? '↩ Mark Incomplete' : '✓ Mark Complete'}
                    </button>
                    <div className="footer-right-actions">
                        <button
                            className="btn-access-docs"
                            disabled={!task.relatedDocumentId}
                            onClick={() => onAccessDocument(task.relatedDocumentId)}
                        >
                            📄 Access Document
                        </button>
                        <button className="btn-delete-task" onClick={(e) => { e.stopPropagation(); onDelete(); }}>
                            <TrashIcon />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskDetailsModal;
