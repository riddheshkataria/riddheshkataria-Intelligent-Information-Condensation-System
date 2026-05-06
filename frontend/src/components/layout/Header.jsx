import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { ProfileIcon, SearchIcon } from '../icons/Icons';
import { searchDocuments, searchTasks } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

const Header = memo(() => {
    const [query, setQuery] = useState('');
    const [docResults, setDocResults] = useState([]);
    const [taskResults, setTaskResults] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const wrapperRef = useRef(null);
    const debounceRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { logout } = useAuth();

    // Debounced search — searches both documents and tasks
    const handleSearch = useCallback((value) => {
        setQuery(value);

        if (debounceRef.current) clearTimeout(debounceRef.current);

        if (!value.trim()) {
            setDocResults([]);
            setTaskResults([]);
            setIsOpen(false);
            return;
        }

        debounceRef.current = setTimeout(async () => {
            try {
                setIsLoading(true);
                const [docs, tasks] = await Promise.all([
                    searchDocuments(value.trim()).catch(() => []),
                    searchTasks(value.trim()).catch(() => []),
                ]);
                setDocResults(docs);
                setTaskResults(tasks);
                setIsOpen(true);
            } catch (err) {
                console.error('Search failed:', err);
                setDocResults([]);
                setTaskResults([]);
            } finally {
                setIsLoading(false);
            }
        }, 300);
    }, []);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleDocClick = (docId) => {
        setIsOpen(false);
        setQuery('');
        navigate(`/document/${docId}`);
    };

    const handleTaskClick = () => {
        // Navigate to dashboard and close search
        setIsOpen(false);
        setQuery('');
        navigate('/dashboard');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            setIsOpen(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const hasResults = docResults.length > 0 || taskResults.length > 0;

    return (
        <header className="dashboard-header">
            <div className="header-left">
                <button 
                    className="mobile-nav-toggle" 
                    onClick={() => setIsNavOpen(!isNavOpen)}
                    aria-label="Toggle navigation"
                >
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        {isNavOpen ? (
                            <>
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </>
                        ) : (
                            <>
                                <line x1="3" y1="12" x2="21" y2="12"></line>
                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                <line x1="3" y1="18" x2="21" y2="18"></line>
                            </>
                        )}
                    </svg>
                </button>
                <div className="logo">
                    <span className="logo-text">IICS</span>
                </div>
                
                <nav className={`header-nav ${isNavOpen ? 'open' : ''}`}>
                    <NavLink to="/dashboard" onClick={() => setIsNavOpen(false)} className={({ isActive }) => `nav-tab ${isActive ? 'active' : ''}`}>Home</NavLink>
                    <NavLink to="/database" onClick={() => setIsNavOpen(false)} className={({ isActive }) => `nav-tab ${isActive ? 'active' : ''}`}>Database</NavLink>
                    <NavLink to="/archive" onClick={() => setIsNavOpen(false)} className={({ isActive }) => `nav-tab ${isActive ? 'active' : ''}`}>Archives</NavLink>
                </nav>
            </div>

            <div className="search-bar" ref={wrapperRef}>
                <SearchIcon />
                <input
                    type="text"
                    placeholder="Search documents, tasks..."
                    value={query}
                    onChange={(e) => handleSearch(e.target.value)}
                    onFocus={() => query.trim() && hasResults && setIsOpen(true)}
                    onKeyDown={handleKeyDown}
                />
                {isOpen && (
                    <div className="search-results-dropdown">
                        {isLoading ? (
                            <div className="search-result-item search-loading">
                                <div className="search-spinner" />
                                <span>Searching...</span>
                            </div>
                        ) : !hasResults ? (
                            <div className="search-result-item search-empty">
                                No results found for &ldquo;{query}&rdquo;
                            </div>
                        ) : (
                            <>
                                {docResults.length > 0 && (
                                    <div className="search-section">
                                        <div className="search-section-label">Documents</div>
                                        {docResults.map((doc) => (
                                            <button
                                                type="button"
                                                key={doc._id}
                                                className="search-result-item"
                                                onClick={() => handleDocClick(doc._id)}
                                            >
                                                <div className="search-result-title">
                                                    <span className="search-result-icon">📄</span>
                                                    {doc.originalFilename}
                                                </div>
                                                <div className="search-result-meta">
                                                    <span className="search-result-type">{doc.documentType || 'Unclassified'}</span>
                                                    <span className="search-result-status" data-status={doc.status}>{doc.status}</span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}
                                {taskResults.length > 0 && (
                                    <div className="search-section">
                                        <div className="search-section-label">Tasks</div>
                                        {taskResults.map((task) => (
                                            <button
                                                type="button"
                                                key={task._id}
                                                className="search-result-item"
                                                onClick={handleTaskClick}
                                            >
                                                <div className="search-result-title">
                                                    <span className="search-result-icon">✅</span>
                                                    {task.title}
                                                </div>
                                                <div className="search-result-meta">
                                                    <span className="search-result-status" data-status={task.status}>{task.status}</span>
                                                    {task.urgency && (
                                                        <span className="search-result-urgency" data-urgency={task.urgency}>{task.urgency}</span>
                                                    )}
                                                    {task.deadline && (
                                                        <span className="search-result-type">Due: {task.deadline}</span>
                                                    )}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                )}
            </div>
            <div className="header-controls">
                <Link to="/profile" className="profile-button" aria-label="Profile">
                    <ProfileIcon />
                </Link>
                <button onClick={handleLogout} className="logout-button" aria-label="Logout">
                    Logout
                </button>
            </div>
        </header>
    );
});

Header.displayName = 'Header';
export default Header;
