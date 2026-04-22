import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { ArchiveIcon, DatabaseIcon, SearchIcon, StarIcon, UploadIcon } from './components/icons/Icons';
import databaseStyles from './Database.css?raw';
import { useDocuments } from './hooks/useDocuments';

const MenuIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

const TableIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M3 10H21" stroke="currentColor" strokeWidth="2" />
        <path d="M9 10V20" stroke="currentColor" strokeWidth="2" />
    </svg>
);

const GridIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="3" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="2" />
        <rect x="13" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="2" />
        <rect x="3" y="13" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="2" />
        <rect x="13" y="13" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="2" />
    </svg>
);

const sidebarItems = [
    { label: 'Database', icon: DatabaseIcon, active: false },
    { label: 'Starred', icon: StarIcon, active: false },
    { label: 'Archive', icon: ArchiveIcon, active: true },
    { label: 'Uploaded Documents', icon: UploadIcon, active: false },
];

const ArchivePage = () => {
    const { documents: allDocuments, fetchDocuments, toggleStar } = useDocuments();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [viewMode, setViewMode] = useState('table');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    
    useEffect(() => {
        fetchDocuments();
    }, [fetchDocuments]);

    const documents = useMemo(() => allDocuments.filter(doc => doc.isArchived), [allDocuments]);

    const starredCount = useMemo(
        () => documents.filter((doc) => doc.isStarred).length,
        [documents]
    );

    const categories = useMemo(
        () => ['all', 'starred', ...new Set(documents.map((item) => item.category))],
        [documents]
    );

    const filteredDocuments = useMemo(() => {
        let filtered = [...documents];

        const query = searchQuery.trim().toLowerCase();
        if (query) {
            filtered = filtered.filter(
                (doc) =>
                    doc.title.toLowerCase().includes(query) ||
                    doc.description.toLowerCase().includes(query) ||
                    doc.category.toLowerCase().includes(query)
            );
        }

        if (selectedCategory === 'starred') {
            filtered = filtered.filter((doc) => doc.isStarred);
        } else if (selectedCategory !== 'all') {
            filtered = filtered.filter((doc) => doc.category === selectedCategory);
        }

        return filtered;
    }, [documents, searchQuery, selectedCategory]);

    const toggleSidebar = () => {
        setSidebarOpen((previous) => !previous);
    };

    const handleStarToggle = (docId) => {
        toggleStar(docId);
    };

    return (
        <div className="database-page">
            <style>{databaseStyles}</style>
            <Header />

            <div
                className={`database-sidebar-scrim ${isSidebarOpen ? 'open' : ''}`}
                onClick={toggleSidebar}
                aria-hidden={!isSidebarOpen}
            />

            <aside className={`database-sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <h2>Library</h2>
                <ul>
                    {sidebarItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <li key={item.label} className={item.active ? 'active' : ''}>
                                <Icon size={18} />
                                <span>{item.label}</span>
                            </li>
                        );
                    })}
                </ul>
            </aside>

            <main className="database-main-content">
                <section className="database-overview-panel">
                    <div className="database-overview-copy">
                        <p className="database-kicker">Operations Intelligence Hub</p>
                        <h1>Document Archive</h1>
                        <p>
                            View your archived documents here.
                        </p>
                    </div>

                    <div className="database-overview-actions">
                        <Link to="/dashboard" className="database-outline-btn">
                            Back to Dashboard
                        </Link>
                        <button
                            type="button"
                            className="database-outline-btn"
                            onClick={toggleSidebar}
                            aria-label="Toggle database sidebar"
                        >
                            <MenuIcon />
                            <span>Menu</span>
                        </button>
                    </div>
                </section>

                <section className="database-content-shell">
                    <div className="database-toolbar">
                        <label className="database-search" htmlFor="database-search-input">
                            <SearchIcon size={16} />
                            <input
                                id="database-search-input"
                                type="text"
                                placeholder="Search documents..."
                                value={searchQuery}
                                onChange={(event) => setSearchQuery(event.target.value)}
                            />
                        </label>

                        <div className="database-toolbar-controls">
                            <select
                                className="database-category-filter"
                                value={selectedCategory}
                                onChange={(event) => setSelectedCategory(event.target.value)}
                                aria-label="Filter documents by category"
                            >
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category === 'all'
                                            ? 'All Categories'
                                            : category === 'starred'
                                                ? 'Starred Only'
                                                : category}
                                    </option>
                                ))}
                            </select>

                            <div className="database-view-toggle" role="group" aria-label="Change database view">
                                <button
                                    type="button"
                                    className={viewMode === 'table' ? 'active' : ''}
                                    onClick={() => setViewMode('table')}
                                >
                                    <TableIcon />
                                </button>
                                <button
                                    type="button"
                                    className={viewMode === 'cards' ? 'active' : ''}
                                    onClick={() => setViewMode('cards')}
                                >
                                    <GridIcon />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="database-meta-row">
                        <span>{filteredDocuments.length} Documents</span>
                        <span>{starredCount} Starred</span>
                    </div>

                    {filteredDocuments.length === 0 ? (
                        <div className="database-empty-state">
                            <ArchiveIcon size={24} />
                            <p>No archived documents found.</p>
                        </div>
                    ) : viewMode === 'table' ? (
                        <div className="database-table-wrap">
                            <table className="database-table">
                                <thead>
                                    <tr>
                                        <th aria-label="Starred" />
                                        <th>Document Title</th>
                                        <th>Description</th>
                                        <th>Category</th>
                                        <th className="text-right">Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredDocuments.map((document) => (
                                        <tr key={document.id}>
                                            <td>
                                                <button
                                                    type="button"
                                                    className={`database-star-btn ${document.isStarred ? 'starred' : ''}`}
                                                    onClick={() => handleStarToggle(document.id)}
                                                    aria-label={
                                                        document.isStarred
                                                            ? 'Remove from starred'
                                                            : 'Add to starred'
                                                    }
                                                >
                                                    <StarIcon size={16} filled={document.isStarred} />
                                                </button>
                                            </td>
                                            <td className="database-table-title">{document.title}</td>
                                            <td className="database-table-description">{document.description}</td>
                                            <td>{document.category}</td>
                                            <td className="text-right">{document.time}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="database-card-grid">
                            {filteredDocuments.map((document) => (
                                <article key={document.id} className="database-card">
                                    <div className="database-card-head">
                                        <span>{document.category}</span>
                                        <button
                                            type="button"
                                            className={`database-star-btn ${document.isStarred ? 'starred' : ''}`}
                                            onClick={() => handleStarToggle(document.id)}
                                            aria-label={
                                                document.isStarred
                                                    ? 'Remove from starred'
                                                    : 'Add to starred'
                                            }
                                        >
                                            <StarIcon size={16} filled={document.isStarred} />
                                        </button>
                                    </div>
                                    <h3>{document.title}</h3>
                                    <p>{document.description}</p>
                                    <small>{document.time}</small>
                                </article>
                            ))}
                        </div>
                    )}
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default ArchivePage;
