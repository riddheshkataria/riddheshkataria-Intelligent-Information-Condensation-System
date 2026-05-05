import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { ArchiveIcon, DatabaseIcon, SearchIcon, StarIcon, UploadIcon } from './components/icons/Icons';
import databaseStyles from './Database.css?raw';

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

const initialMockData = [
    { id: 1, title: 'Rolling Stock Maintenance SOP', description: 'Standard operating procedures for daily train maintenance and checks.', category: 'Operations & Maintenance', time: '9:15 AM', isStarred: false },
    { id: 2, title: 'Station Staffing Roster Q4', description: 'Weekly duty roster for all customer service and station staff for the fourth quarter.', category: 'Operations & Maintenance', time: '8:30 AM', isStarred: false },
    { id: 3, title: 'Track Inspection Report - Sept', description: 'Monthly inspection report for the main line tracks and signalling.', category: 'Operations & Maintenance', time: 'Yesterday', isStarred: true },
    { id: 4, title: 'Q3 Financial Statement', description: 'Quarterly financial statements and corporate performance review.', category: 'Finance', time: '10:02 AM', isStarred: true },
    { id: 5, title: 'Annual Budget Proposal 2026', description: 'The proposed budget allocation for all departments for the upcoming fiscal year.', category: 'Finance', time: '2:10 PM', isStarred: false },
    { id: 6, title: 'Vendor Payment Records', description: 'Ledger of all payments made to approved vendors in Q3.', category: 'Finance', time: '4 Days Ago', isStarred: false },
    { id: 7, title: 'Employee Onboarding Manual', description: 'A comprehensive handbook for new hires detailing all company policies.', category: 'Human Resources', time: '11:30 AM', isStarred: false },
    { id: 8, title: 'Recruitment Drive Plan - Technicians', description: 'Strategy and planning document for hiring new train operators and technicians.', category: 'Human Resources', time: '12:00 PM', isStarred: false },
    { id: 9, title: 'Performance Review Guidelines', description: 'SOP for conducting annual employee performance reviews.', category: 'Human Resources', time: '2 Weeks Ago', isStarred: false },
    { id: 10, title: 'New Line Extension Blueprint', description: 'Technical drawings and project plan for the Phase 2 extension.', category: 'Projects & Planning', time: '1:45 PM', isStarred: false },
    { id: 11, title: 'Signalling System Spec Sheet', description: 'Technical specifications for the new CBTC signalling system tender.', category: 'Projects & Planning', time: 'Yesterday', isStarred: true },
    { id: 12, title: 'Platform Safety Audit - Oct 2025', description: 'Monthly safety and security inspection report for all metro stations.', category: 'Safety & Security', time: '3:20 PM', isStarred: true },
    { id: 13, title: 'CCTV Footage Access Policy', description: 'Rules and regulations for requesting and accessing security camera footage.', category: 'Safety & Security', time: 'Yesterday', isStarred: false },
    { id: 14, title: 'Emergency Evacuation Drill Report', description: 'Post-action report from the latest system-wide emergency drill.', category: 'Safety & Security', time: 'Last Week', isStarred: false },
    { id: 15, title: 'IT Server Infrastructure Upgrade', description: 'Detailed plan and budget for the upcoming server hardware replacement.', category: 'Information Technology', time: '4:55 PM', isStarred: false },
    { id: 16, title: 'Ticketing System API Docs', description: 'Technical documentation for the automated fare collection (AFC) system API.', category: 'Information Technology', time: 'Yesterday', isStarred: false },
    { id: 17, title: 'Cybersecurity Policy v3.1', description: 'Updated company-wide policy on data security and acceptable use.', category: 'Information Technology', time: '3 Days Ago', isStarred: true },
    { id: 18, title: 'Land Acquisition Contract - Phase 2', description: 'Legal contracts pertaining to land acquisition for the new line.', category: 'Legal', time: '1 Week Ago', isStarred: false },
    { id: 19, title: 'Regulatory Compliance Checklist', description: 'Checklist of all national and state transport regulations.', category: 'Legal', time: '5 Days Ago', isStarred: false },
    { id: 20, title: 'Press Release - New Smart Card', description: 'Official press release document for the launch of the new smart card.', category: 'Marketing & PR', time: '10:00 AM', isStarred: false },
    { id: 21, title: 'Social Media Content Calendar', description: 'Monthly schedule for posts on all social media platforms.', category: 'Marketing & PR', time: 'Yesterday', isStarred: false },
    { id: 22, title: 'Tender Document - Station Cleaning Services', description: 'Request for Proposal (RFP) for station housekeeping and cleaning.', category: 'Procurement', time: '2 Days Ago', isStarred: false },
    { id: 23, title: 'Vendor Onboarding SOP', description: 'Standard procedure for registering new suppliers and vendors.', category: 'Procurement', time: 'Last Month', isStarred: false },
    { id: 24, title: 'Monthly Feedback Analysis Report', description: 'Analysis of customer feedback collected from all channels in September.', category: 'Customer Relations', time: '3 Days Ago', isStarred: false },
    { id: 25, title: 'Complaint Resolution SOP', description: 'Step-by-step guide for customer service agents on handling complaints.', category: 'Customer Relations', time: '2 Weeks Ago', isStarred: true },
];

const sidebarItems = [
    { label: 'Database', icon: DatabaseIcon, active: true },
    { label: 'Starred', icon: StarIcon, active: false },
    { label: 'Archive', icon: ArchiveIcon, active: false },
    { label: 'Uploaded Documents', icon: UploadIcon, active: false },
];

const ITEMS_PER_PAGE = 9;

const DatabasePage = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [viewMode, setViewMode] = useState('table');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [documents, setDocuments] = useState(initialMockData);
    const [currentPage, setCurrentPage] = useState(1);

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

    const totalPages = Math.max(1, Math.ceil(filteredDocuments.length / ITEMS_PER_PAGE));
    const pageStartIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedDocuments = filteredDocuments.slice(pageStartIndex, pageStartIndex + ITEMS_PER_PAGE);
    const showingFrom = filteredDocuments.length === 0 ? 0 : pageStartIndex + 1;
    const showingTo = Math.min(pageStartIndex + ITEMS_PER_PAGE, filteredDocuments.length);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, selectedCategory]);

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    const toggleSidebar = () => {
        setSidebarOpen((previous) => !previous);
    };

    const handleStarToggle = (docId) => {
        setDocuments((previousDocs) =>
            previousDocs.map((doc) =>
                doc.id === docId ? { ...doc, isStarred: !doc.isStarred } : doc
            )
        );
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
                        <h1>Document Database</h1>
                        <p>
                            Browse, filter, and prioritize documents in one place with a layout
                            consistent with your dashboard pages.
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
                            <DatabaseIcon size={24} />
                            <p>No matching documents found.</p>
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
                                    {paginatedDocuments.map((document) => (
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
                            {paginatedDocuments.map((document) => (
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

                    {filteredDocuments.length > 0 && (
                        <div className="database-pagination">
                            <p className="database-pagination-summary">
                                Showing {showingFrom}-{showingTo} of {filteredDocuments.length}
                            </p>
                            <div className="database-pagination-controls">
                                <button
                                    type="button"
                                    onClick={() => setCurrentPage((previous) => Math.max(1, previous - 1))}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </button>
                                <span>Page {currentPage} of {totalPages}</span>
                                <button
                                    type="button"
                                    onClick={() => setCurrentPage((previous) => Math.min(totalPages, previous + 1))}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default DatabasePage;
