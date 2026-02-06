import React, { useState, useMemo, useEffect, useRef } from 'react';
import './Dashboard.css'; // Make sure this CSS file is also complete and in the same folder
import Upload from './Upload';
import { getDocuments, uploadDocument, getDocumentStatus, getTasks, updateTaskStatus, createTask } from './api.js';
import { Link } from 'react-router-dom';


// --- SVG Icons ---
const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
const ProfileIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const UploadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>;
const DatabaseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>;
const ArchiveIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line></svg>;
const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>;
const CloseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
// --- NEW Social Media Icons ---
const FacebookIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>;
const InstagramIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.644-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z"/></svg>;
const TwitterIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.617l-5.21-6.817-6.042 6.817h-3.308l7.746-8.85-8.502-10.64h6.617l4.686 6.102 5.574-6.102zm-1.164 17.52h1.839l-11.417-15.34h-1.839l11.417 15.34z"/></svg>;
const LinkedInIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg>;
const YouTubeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>;
// ADD THIS ENTIRE NEW COMPONENT

// --- NEW Document View Modal Component ---
const DocumentViewModal = ({ document, onClose }) => {
    if (!document) return null;

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content details-modal" onClick={(e) => e.stopPropagation()}>
                <div className="details-modal-header">
                    <h2>{document.originalFilename}</h2>
                    <button className="btn-close" onClick={onClose}><CloseIcon /></button>
                </div>
                <div className="details-modal-body">
                    <p><strong>Status:</strong> {document.status}</p>
                    <p><strong>Document Type:</strong> {document.documentType || 'Unclassified'}</p>
                    <hr style={{ margin: '1rem 0' }} />
                    <p><strong>Summary:</strong></p>
                    <p>{document.summary || 'No summary available.'}</p>
                </div>
            </div>
        </div>
    );
};
// --- Header Component ---
const DashboardHeader = () => {
  const [language, setLanguage] = useState('English');
  const toggleLanguage = () => setLanguage(current => (current === 'English' ? 'മലയാളം' : 'English'));

  return (
    <header className="dashboard-header">
      <div className="logo">
        <img src="/logo.png" alt="Kochi Metro Logo" />
        <span><h1>KMRL SAARAM</h1></span>
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
        <button aria-label="Search"><SearchIcon /></button>
      </div>
      <div className="header-controls">
        <button onClick={toggleLanguage} className="language-toggle">{language} <span>Aあ</span></button>
        <button className="profile-button" aria-label="Profile"><ProfileIcon /></button>
      </div>
    </header>
  );
};

// --- Key Metrics Component ---
const KeyMetrics = ({ overdue, upcoming, totalDocs }) => (
  <div className="metrics-grid">
    <div className="metric-card overdue">
      <div className="metric-icon">🚨</div>
      <div className="metric-details">
        <div className="metric-value">{overdue}</div>
        <div className="metric-label">Overdue Tasks</div>
      </div>
    </div>
    <div className="metric-card upcoming">
      <div className="metric-icon">🗓️</div>
      <div className="metric-details">
        <div className="metric-value">{upcoming}</div>
        <div className="metric-label">Upcoming Deadlines (7d)</div>
      </div>
    </div>
    <div className="metric-card documents">
      <div className="metric-icon">📂</div>
      <div className="metric-details">
        <div className="metric-value">{totalDocs}</div>
        <div className="metric-label">Total Documents</div>
      </div>
    </div>
  </div>
);

// --- Circular Progress Bar ---
const CircularProgressBar = ({ percentage }) => {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="progress-container">
      <svg className="progress-ring" width="140" height="140">
        <circle className="progress-ring-bg" r={radius} cx="70" cy="70" />
        <circle
          className="progress-ring-fg"
          r={radius}
          cx="70"
          cy="70"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
        <text 
          x="70" 
          y="70" 
          className="progress-text" 
          transform="rotate(90 70,70)"
        >
          {`${percentage}%`}
        </text>
      </svg>
      <p className="progress-label">Tasks Completed</p>
    </div>
  );
};

// --- Task Details Modal Component ---
const TaskDetailsModal = ({ task, onClose, onToggle,onAccessDocument }) => {
  if (!task) return null;

  const handleMarkComplete = (e) => {
    e.stopPropagation();
    onToggle();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content details-modal" onClick={(e) => e.stopPropagation()}>
        <div className="details-modal-header">
          <h2>{task.text}</h2>
          <button className="btn-close" onClick={onClose}><CloseIcon /></button>
        </div>
        <div className="details-modal-body">
          <p><strong>Description:</strong> {task.description || 'No description provided.'}</p>
          <p><strong>Deadline:</strong> {task.deadline}</p>
          <p><strong>Urgency:</strong> {task.urgency}</p>
          <p><strong>Status:</strong> {task.completed ? 'Completed' : 'Pending'}</p>
        </div>
        <div className="details-modal-footer" style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <button
            className="btn-mark-complete"
            onClick={handleMarkComplete}
            style={{ padding: "0.7rem 1.4rem", borderRadius: "0.5rem", fontWeight: "600", backgroundColor: "#059669", color: "#fff", border: "none", cursor: "pointer" }}
          >
            {task.completed ? "Mark as Incomplete" : "Mark as Complete"}
          </button>
          <button
            className="btn-access-docs"
            disabled={task.documents === 'None'}
            onClick={() => onAccessDocument(task.relatedDocumentId)}
            style={{ padding: "0.7rem 1.4rem", borderRadius: "0.5rem", fontWeight: "600", backgroundColor: "#E5E7EB", color: "#374151", border: "none", cursor: "pointer" }}
          >
            Access Documents
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Add Task Modal Component ---
const AddTaskModal = ({ isOpen, onClose, onAddTask, documents }) => {
    const [text, setText] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [urgency, setUrgency] = useState('Low');
    const [linkedDocument, setLinkedDocument] = useState('None'); // State for the selected document

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text || !deadline) {
            alert('Task name and deadline are required.');
            return;
        }

        // Simple date format validation
        if (!/^\d{2}\/\d{2}\/\d{4}$/.test(deadline)) {
            alert('Please use DD/MM/YYYY format for the deadline.');
            return;
        }

        // Create the new task object
        const newTask = {
            id: Date.now(),
            text,
            description,
            deadline,
            urgency,
            documents: linkedDocument, // Assign the selected document
            completed: false,
        };

        onAddTask(newTask);

        // Reset all form fields and close the modal
        setText('');
        setDescription('');
        setDeadline('');
        setUrgency('Low');
        setLinkedDocument('None');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Add New Task</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="task-text">Task</label>
                    <input id="task-text" type="text" value={text} onChange={(e) => setText(e.target.value)} required />

                    <label htmlFor="task-desc">Description</label>
                    <textarea id="task-desc" value={description} onChange={(e) => setDescription(e.target.value)} />

                    <label htmlFor="task-deadline">Deadline (DD/MM/YYYY)</label>
                    <input id="task-deadline" type="text" placeholder="e.g., 25/12/2025" value={deadline} onChange={(e) => setDeadline(e.target.value)} required />

                    <label htmlFor="task-urgency">Urgency</label>
                    <select id="task-urgency" value={urgency} onChange={(e) => setUrgency(e.target.value)}>
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                    </select>

                    {/* --- Link Document Dropdown --- */}
                    <label htmlFor="task-document">Link Document</label>
                    <select 
                        id="task-document" 
                        value={linkedDocument} 
                        onChange={(e) => setLinkedDocument(e.target.value)}
                    >
                        <option value="None">None</option>
                        {documents.map(doc => (
                            <option key={doc.id} value={doc.title}>
                                {doc.title}
                            </option>
                        ))}
                    </select>

                    <div className="modal-actions">
                        <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn-add">Add Task</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


// --- To-Do List Component ---
const TodoList = ({ tasks, onTaskClick, onAddTaskClick }) => {
    const isOverdue = (task) => {
        if (task.completed || !task.deadline) return false;
        const [day, month, year] = task.deadline.split('/');
        return new Date(`${year}-${month}-${day}`) < new Date('2025-09-11');
    };

    return (
        <div className="todo-list-container">
            <div className="todo-header">
                <h2>To-Do List</h2>
                {/* The "+ Add Task" button is now back here */}
                <button className="add-task-btn" onClick={onAddTaskClick}>+ Add Task</button>
            </div>
            <div className="todo-grid-header todo-grid-five-columns">
                <span>Task</span>
                <span>Deadline</span>
                <span>Urgency</span>
                <span>Documents</span>
                <span className="text-right">Status</span>
            </div>
            <ul className="todo-grid todo-grid-five-columns">
                {tasks.map(task => (
                    <li key={task.id} className={task.completed ? 'completed' : ''} onClick={() => onTaskClick(task)}>
                        <span className={isOverdue(task) ? 'task-overdue' : 'task-name'}>{task.text}</span>
                        <span className={isOverdue(task) ? 'task-overdue' : ''}>{task.deadline}</span>
                        <span>{task.urgency}</span>
                        <span className="task-docs">{task.documents}</span>
                        <div className="status-dot-container">
                            <span className={`status-dot ${task.completed ? 'completed' : 'incomplete'}`}></span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};


// --- Calendar View Component ---
const CalendarView = ({ tasks }) => {
  const [currentDate, setCurrentDate] = useState(new Date('2025-09-11'));

  const taskDeadlines = useMemo(() => {
    const deadlines = new Set();
    tasks.forEach(task => {
      if (task.deadline) deadlines.add(task.deadline);
    });
    return deadlines;
  }, [tasks]);

  const changeMonth = (offset) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + offset);
      return newDate;
    });
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDayOfMonth });

  const today = new Date();
  const isToday = (day) => {
    return day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
  };

  const hasTask = (day) => {
    const formattedDate = `${String(day).padStart(2, '0')}/${String(month + 1).padStart(2, '0')}/${year}`;
    return taskDeadlines.has(formattedDate);
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={() => changeMonth(-1)}>&lt;</button>
        <h3>{monthName} {year}</h3>
        <button onClick={() => changeMonth(1)}>&gt;</button>
      </div>
      <div className="calendar-grid">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => <div key={day} className="day-name">{day}</div>)}
        {blanks.map((_, i) => <div key={`blank-${i}`}></div>)}
        {days.map(day => (
          <div key={day} className={`day-cell ${isToday(day) ? 'today' : ''}`}>
            <span>{day}</span>
            {hasTask(day) && <div className="task-dot"></div>}
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Document Manager Component with Upload popup ---
const DocumentManager = ({ documents, setDocuments, onUploadClick  }) => {
    console.log('DocumentManager rendered. The onUpload function is:', onUploadClick);
  const [activeTab, setActiveTab] = useState('featured');
  const [uploadOpen, setUploadOpen] = useState(false); // <-- Upload popup state

  const toggleStar = (docId) => {
    setDocuments(currentDocs =>
      currentDocs.map(doc =>
        doc.id === docId ? { ...doc, starred: !doc.starred } : doc
      )
    );
  };

  const documentsToShow = useMemo(() => {
        // This now correctly displays the limited list of the 5 latest documents.
        return documents;
    }, [documents]);

  return (
    <section className="document-manager-container">
      <div className="action-buttons-grid">
        <button className="action-btn" onClick={() => setUploadOpen(true)}><UploadIcon /><span>Upload</span></button>
        <button className="action-btn"><DatabaseIcon /><span>Database</span></button>
        <button className="action-btn"><ArchiveIcon /><span>Archive</span></button>
      </div>

      {uploadOpen && <Upload onClose={() => setUploadOpen(false)} onUpload={onUploadClick} />}

      <div className="doc-tabs">
        <button className={activeTab === 'featured' ? 'active' : ''} onClick={() => setActiveTab('featured')}>
          <CheckIcon /> Featured Documents
        </button>
        <button className={activeTab === 'recent' ? 'active' : ''} onClick={() => setActiveTab('recent')}>
          Recently Viewed Documents
        </button>
      </div>

      <div className="document-list-container">
        <div className="doc-list-header">
          <span>⭐</span>
          <span>Document Title</span>
          <span>Description</span>
          <span>Category</span>
          <span className="text-right">Time</span>
        </div>
        <ul className="doc-list">
            {documentsToShow.map(doc => (
                <Link to={`/document/${doc.id}`} key={doc.id} className="document-link">
                    <li>
                        <span 
                            className={doc.starred ? 'star-active' : 'star-inactive'} 
                            onClick={(e) => {
                                // Prevent the link from navigating when you click the star
                                e.preventDefault(); 
                                toggleStar(doc.id);
                            }}
                        >
                            ⭐
                        </span>
                        <span className="doc-title">{doc.title}</span>
                        <span className="doc-description">{doc.description}</span>
                        <span>{doc.category}</span>
                        <span className="text-right">{doc.time}</span>
                    </li>
                </Link>
            ))}
        </ul>

      </div>
    </section>
  );
};

// --- Dashboard Footer ---
const DashboardFooter = () => (
  <footer className="footer">
    <div className="footer-container">
      <div className="footer-logo">
        <img src="/logo.png" alt="KMRL Logo" />
      </div>
      <div className="contact-details">
        <div className="contact-section">
          <h4>Contact Us</h4>
          <p>+91 0000000000 / +91 0000000000</p>
          <p>project@kmrl.com</p>
        </div>
        <div className="address-section">
          <h4>Address</h4>
          <p>Kochi Metro Rail Ltd. (KMRL), 4th Floor, Revenue Tower,</p>
          <p>Park Avenue, Kochi - 682011, Kerala, India.</p>
        </div>
      </div>
      <div className="social-media">
        <h4>Follow Us</h4>
        <div className="social-icons">
          <a href="#" aria-label="Facebook"><FacebookIcon /></a>
          <a href="#" aria-label="Instagram"><InstagramIcon /></a>
          <a href="#" aria-label="Twitter"><TwitterIcon /></a>
          <a href="#" aria-label="LinkedIn"><LinkedInIcon /></a>
          <a href="#" aria-label="YouTube"><YouTubeIcon /></a>
        </div>
      </div>
    </div>
  </footer>
);

// --- Main Dashboard Component ---
function Dashboard() {
    const [tasks, setTasks] = useState([]);

    const [documents, setDocuments] = useState([
        { id: 1, title: 'Quarterly Report Q3', description: 'Comprehensive analysis...', category: 'Reports', time: '12:26 PM', starred: true, view: 'featured' },
        { id: 2, title: 'Marketing Campaign Plan', description: 'Strategy document...', category: 'Planning', time: '11:15 AM', starred: false, view: 'featured' },
        { id: 3, title: 'Meeting Notes - Sept 5', description: 'Action items...', category: 'Meetings', time: 'Yesterday', starred: false, view: 'recent' },
        { id: 4, title: 'Employee Handbook v3', description: 'Updated company policies...', category: 'HR', time: '2 days ago', starred: false, view: 'recent' },
    ]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const fileInputRef = useRef(null);
    const [documentToView, setDocumentToView] = useState(null);
    const fetchDocuments = async () => {
    try {
        setLoading(true);
        const fetchedDocs = await getDocuments(5);
        // This maps your backend data to the format the UI expects
        const formattedDocs = fetchedDocs.map(doc => ({
            id: doc._id,
            title: doc.originalFilename,
            description: doc.summary || (doc.status === 'processing' ? 'Processing...' : 'No summary available.'),
            category: doc.documentType || 'Unclassified',
            time: new Date(doc.createdAt).toLocaleTimeString(),
            status: doc.status,
            starred: false, // Default value
            view: 'recent' // Default value
        }));
        setDocuments(formattedDocs);
        } catch (err) {
        setError(err.message);
        } finally {
        setLoading(false);
        }
    };

// This hook runs once when the component loads to fetch initial data
    useEffect(() => {
        const fetchData = async () => {
         await fetchDocuments();
         try {
          const fetchedTasks = await getTasks();
            const formattedTasks = fetchedTasks.map(t => ({
                ...t, 
                id: t._id, 
                text: t.title,
                completed: t.status === 'completed',
                // ADD a user-friendly document name for the list
                documents: t.relatedDocument ? t.relatedDocument.originalFilename : 'None',
                // ADD the actual ID so we can fetch it later
                relatedDocumentId: t.relatedDocument ? t.relatedDocument._id : null
            }));
            setTasks(formattedTasks);
         } catch (err) {
          setError(err.message);
         }
      };
      fetchData();
    }, []);

    // REPLACE the old handleFileUpload function with this one.
    const handleFileUpload = async (file, additionalData) => {
        try {
            // Use the uploadDocument function from api.js, passing both arguments
            const response = await uploadDocument(file, additionalData);
            const { documentId } = response;

            // Immediately add a placeholder to the UI for a better user experience
            setDocuments(prevDocs => [
                { id: documentId, title: file.name, description: 'Uploading & Processing...', status: 'processing', view: 'recent' },
                ...prevDocs,
            ]);

            // Start checking the status every 5 seconds
            const intervalId = setInterval(async () => {
                try {
                    const doc = await getDocumentStatus(documentId);
                    if (doc.status === 'completed' || doc.status === 'failed') {
                        clearInterval(intervalId); // Stop checking once done
                        fetchDocuments(); // Refresh the whole list with the final data
                    }
                } catch (pollError) {
                    console.error("Polling error:", pollError);
                    clearInterval(intervalId);
                }
            }, 5000);

        } catch (err) {
            setError(err.message);
        }
    };

    const handleToggleTask = async (taskId, currentStatus) => {
      const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
      try {
          await updateTaskStatus(taskId, newStatus);
          // Update the UI instantly without a full refresh
          setTasks(currentTasks =>
              currentTasks.map(task =>
                  task.id === taskId ? { ...task, status: newStatus } : task
              )
          );
      } catch (err) {
          setError(err.message);
      }
    };
    // This function will be called by the AddTaskModal component
    const handleAddTask = async (taskDataFromModal) => {
      try {
          // The 'relatedDocument' from the modal is a title, but we need its ID.
          // Find the full document object from our state to get its ID.
          const linkedDoc = documents.find(d => d.title === taskDataFromModal.documents);

          const newTaskData = {
              title: taskDataFromModal.text,
              description: taskDataFromModal.description,
              deadline: taskDataFromModal.deadline,
              urgency: taskDataFromModal.urgency,
              relatedDocument: linkedDoc ? linkedDoc.id : null,
          };

          const newTask = await createTask(newTaskData);

          // Add the new task to the UI instantly without a full page refresh
          // We need to format it to match the UI's expected structure
          const formattedTask = {
            ...newTask,
            id: newTask._id,
            text: newTask.title,
            completed: newTask.status === 'completed'
          };
          setTasks(prevTasks => [formattedTask, ...prevTasks]);

      } catch (err) {
          setError(err.message); // Use your existing error state to show feedback
      }
    };
    
    // ADD THIS NEW FUNCTION
    const handleToggleTaskStatus = async (taskId, currentStatus) => {
        console.log(`Attempting to update task ${taskId} from status: ${currentStatus}`); // <-- ADD THIS LINE
        const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
        try {
            await updateTaskStatus(taskId, newStatus);
            // Instantly update the UI without a full reload
            setTasks(currentTasks =>
                currentTasks.map(task =>
                    task.id === taskId ? { ...task, status: newStatus, completed: newStatus === 'completed' } : task
                )
            );
            // This line closes the modal
            setSelectedTask(null); 
        } catch (err) {
            setError(err.message);
        }
    };

    // REPLACE the old handleAccessDocument function with this one
    const handleAccessDocument = (documentId) => {
        if (!documentId) {
            alert('No document is linked to this task.');
            return;
        }
        // We construct the URL to the backend endpoint
        // The browser needs the full token to authenticate the request in the new tab
        const token = localStorage.getItem('userToken'); 
        const fileUrl = `http://localhost:5000/api/docs/file/${documentId}`;

        // This is a trick to open a protected file in a new tab
        fetch(fileUrl, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => res.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            window.open(url);
        })
        .catch(err => {
            console.error("Failed to fetch document file:", err);
            setError("Could not open document.");
        });
    };
    // This function will be passed to the TodoList button to open the modal
    const handleOpenAddTaskModal = () => {
        setAddModalOpen(true);
    };
    // ADD THIS NEW FUNCTION
    // This function will be called by the main "Upload" button on the dashboard
    const handleUploadClick = () => {
        // This programmatically "clicks" our hidden file input
        console.log('Dashboard: handleUploadClick triggered. Opening file explorer...');
        fileInputRef.current.click();
    };
    // ADD THIS NEW FUNCTION
    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) {
            return; // Do nothing if the user cancels the file selection
        }

        try {
            const response = await uploadDocument(file);
            const { documentId } = response;

            // Immediately add a placeholder to the UI for a better user experience
            setDocuments(prevDocs => [
                { id: documentId, title: file.name, description: 'Uploading & Processing...', status: 'processing', view: 'recent' },
                ...prevDocs,
            ]);

            // Start checking the status every 5 seconds
            const intervalId = setInterval(async () => {
                try {
                    const doc = await getDocumentStatus(documentId);
                    if (doc.status === 'completed' || doc.status === 'failed') {
                        clearInterval(intervalId); // Stop checking once done
                        fetchDocuments(); // Refresh the whole list with the final data
                    }
                } catch (pollError) {
                    console.error("Polling error:", pollError);
                    clearInterval(intervalId); // Stop polling on error
                }
            }, 5000);

        } catch (err) {
            setError(err.message); // Use your existing error state for feedback
        }
    };

    const now = new Date('2025-09-11T12:00:00');
    const { overdue, upcoming, completionPercentage } = useMemo(() => {
        let overdueCount = 0;
        let upcomingCount = 0;

        const activeTasks = tasks.filter(task => {
            if (!task.completed) return true;
            if (!task.deadline) return false;
            const [day, month, year] = task.deadline.split('/');
            const dueDate = new Date(`${year}-${month}-${day}`);
            return dueDate >= now;
        });

        activeTasks.forEach(task => {
            if (task.completed || !task.deadline) return;
            const [day, month, year] = task.deadline.split('/');
            const dueDate = new Date(`${year}-${month}-${day}`);
            if (dueDate < now) {
                overdueCount++;
            } else {
                const sevenDaysFromNow = new Date(now);
                sevenDaysFromNow.setDate(now.getDate() + 7);
                if (dueDate <= sevenDaysFromNow) {
                    upcomingCount++;
                }
            }
        });
        
        const completedActiveTasks = activeTasks.filter(task => task.completed).length;
        const percentage = activeTasks.length > 0 ? Math.round((completedActiveTasks / activeTasks.length) * 100) : 0;
        
        return { overdue: overdueCount, upcoming: upcomingCount, completionPercentage: percentage };
    }, [tasks]);

    const visibleTasks = useMemo(() => {
      // For now, we will show all tasks to prevent completed ones from disappearing.
      // We can add more complex filtering logic later.
      return tasks;
    }, [tasks]);

    return (
        <div className="dashboard-layout">
            <DashboardHeader />
            <main className="dashboard-main-content">
                <h1 className="main-title">Dashboard</h1>
                
                <div className="dashboard-widgets">
                    <KeyMetrics 
                        overdue={overdue}
                        upcoming={upcoming}
                        totalDocs={documents.length}
                    />
                    <CircularProgressBar percentage={completionPercentage} />
                </div>
                
                <section className="main-content-grid">
                    <TodoList 
                        tasks={visibleTasks} 
                        onTaskClick={setSelectedTask} 
                        onAddTaskClick={handleOpenAddTaskModal} // Pass the correct handler
                    />
                    <CalendarView tasks={tasks} />
                </section>
                
                <DocumentManager documents={documents} setDocuments={setDocuments} onUploadClick={handleFileUpload} />
            </main>
            <DashboardFooter />

            <TaskDetailsModal
                task={selectedTask}
                onClose={() => setSelectedTask(null)}
                // This is the fix. It now correctly calls your main handler function.
                onToggle={() => handleToggleTaskStatus(selectedTask.id, selectedTask.status)}
                onAccessDocument={handleAccessDocument}
            />
            
            {/* The AddTaskModal is now controlled by the isAddModalOpen state */}
            <AddTaskModal 
                isOpen={isAddModalOpen} 
                onClose={() => setAddModalOpen(false)} 
                onAddTask={handleAddTask} 
                documents={documents} // Pass the documents array as a prop
            />

            <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} // We will create this function next
                style={{ display: 'none' }} 
                accept=".pdf"
            />
        </div>
    );
}


export default Dashboard;
