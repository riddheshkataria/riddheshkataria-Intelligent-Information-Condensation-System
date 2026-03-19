import React, { useState } from 'react';
import { CloseIcon, PlusIcon } from '../icons/Icons';

const AddTaskModal = ({ isOpen, onClose, onAddTask, documents }) => {
    const [text, setText] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [urgency, setUrgency] = useState('Low');
    const [linkedDocument, setLinkedDocument] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text) {
            alert('Task name is required.');
            return;
        }

        let formattedDeadline = '';
        if (deadline) {
            const [year, month, day] = deadline.split('-');
            formattedDeadline = `${day}/${month}/${year}`;
        }

        onAddTask({
            title: text,
            description,
            deadline: formattedDeadline,
            urgency,
            relatedDocument: linkedDocument || null,
        });

        setText('');
        setDescription('');
        setDeadline('');
        setUrgency('Low');
        setLinkedDocument('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content add-task-modal" onClick={(e) => e.stopPropagation()}>
                <div className="add-modal-header">
                    <h2>✨ New Task</h2>
                    <button className="btn-close" onClick={onClose}><CloseIcon /></button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="task-text">Task Name</label>
                        <input id="task-text" type="text" placeholder="What needs to be done?" value={text} onChange={(e) => setText(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="task-desc">Description</label>
                        <textarea id="task-desc" placeholder="Add details..." value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="task-deadline">Deadline</label>
                            <input id="task-deadline" type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="task-urgency">Urgency</label>
                            <select id="task-urgency" value={urgency} onChange={(e) => setUrgency(e.target.value)}>
                                <option>Low</option>
                                <option>Medium</option>
                                <option>High</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="task-document">Link Document</label>
                        <select id="task-document" value={linkedDocument} onChange={(e) => setLinkedDocument(e.target.value)}>
                            <option value="">None</option>
                            {documents.map((doc) => (
                                <option key={doc.id} value={doc.id}>{doc.title}</option>
                            ))}
                        </select>
                    </div>
                    <div className="modal-actions">
                        <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn-add"><PlusIcon /> Add Task</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTaskModal;
