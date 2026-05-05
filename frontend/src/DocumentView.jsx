import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { ArchiveIcon, ChevronLeftIcon } from './components/icons/Icons';
import { getDocumentStatus } from './services/api.js';
import DocumentChat from './components/DocumentChat';
import './DocumentView.css';

const MailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
    </svg>
);

const getStatusClass = (status) => {
    const normalizedStatus = (status || '').toLowerCase();

    if (normalizedStatus === 'completed') {
        return 'status-completed';
    }

    if (normalizedStatus === 'pending') {
        return 'status-pending';
    }

    if (normalizedStatus === 'failed' || normalizedStatus === 'error') {
        return 'status-failed';
    }

    return 'status-processing';
};

const DocumentView = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [document, setDocument] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        const fetchDocument = async () => {
            try {
                const docData = await getDocumentStatus(id);
                setDocument(docData);

                if (docData?.user) {
                    setSelectedUser(docData.user);
                }
            } catch (fetchError) {
                setError(fetchError.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDocument();
    }, [id]);

    const usersWithAccess = useMemo(() => {
        if (!document) {
            return [];
        }

        return [document.user, ...(document.sharedWith || [])].filter(Boolean);
    }, [document]);

    const summaryParagraphs = useMemo(() => {
        const summaryText = typeof document?.summary === 'string'
            ? document.summary
            : 'No summary available.';
        const parsedParagraphs = summaryText
            .split(/\n+/)
            .map((paragraph) => paragraph.trim())
            .filter(Boolean);

        return parsedParagraphs.length > 0 ? parsedParagraphs : ['No summary available.'];
    }, [document]);

    const handleFetchOriginal = async () => {
        const token = localStorage.getItem('userToken');
        const fileUrl = `http://localhost:5000/api/docs/file/${id}`;

        try {
            const response = await fetch(fileUrl, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch original document.');
            }

            const blob = await response.blob();
            const fileObjectUrl = window.URL.createObjectURL(blob);
            window.open(fileObjectUrl, '_blank');
        } catch (fetchError) {
            console.error('Failed to fetch document file:', fetchError);
            setError('Could not open document.');
        }
    };

    const renderFeedbackState = (message) => (
        <div className="document-page">
            <Header />
            <main className="document-main-content">
                <div className="document-feedback-card">{message}</div>
            </main>
            <Footer />
        </div>
    );

    if (loading) {
        return renderFeedbackState('Loading document...');
    }

    if (error) {
        return renderFeedbackState(`Error: ${error}`);
    }

    if (!document) {
        return renderFeedbackState('Document not found.');
    }

    return (
        <div className="document-page">
            <Header />

            <main className="document-main-content">
                <section className="document-overview-panel">
                    <div className="document-overview-copy">
                        <p className="document-kicker">Operations Intelligence Hub</p>
                        <h1>{document.originalFilename}</h1>
                        <p>
                            Review document status, generated summary, and everyone who currently has access.
                        </p>
                        <div className="document-status-row">
                            <span className={`status-badge ${getStatusClass(document.status)}`}>
                                Status: {document.status || 'Unknown'}
                            </span>
                        </div>
                    </div>

                    <div className="document-overview-actions">
                        <button type="button" className="document-outline-btn" onClick={() => navigate(-1)}>
                            <ChevronLeftIcon size={16} />
                            <span>Back</span>
                        </button>
                        <Link to="/database" className="document-outline-btn">
                            Open Database
                        </Link>
                    </div>
                </section>

                <section className="document-content-grid">
                    <article className="document-summary-card">
                        <div className="document-card-header">
                            <h2>Generated Summary</h2>
                            <p>AI generated condensed insights from the source document.</p>
                        </div>

                        <div className="document-summary-body">
                            {summaryParagraphs.map((paragraph, index) => (
                                <p key={`summary-${index}`}>{paragraph}</p>
                            ))}
                        </div>

                        <div className="document-action-row">
                            <button
                                type="button"
                                className="document-action-btn document-action-btn-primary"
                                onClick={handleFetchOriginal}
                            >
                                Fetch Original Document
                            </button>
                            <button 
                                type="button" 
                                className="document-action-btn document-action-btn-secondary"
                                onClick={async () => {
                                    try {
                                        const { archiveDocument } = await import('./services/api.js');
                                        await archiveDocument(id);
                                        alert('Document archived successfully!');
                                    } catch (err) {
                                        alert('Failed to archive document: ' + err.message);
                                    }
                                }}
                            >
                                <span>Archive</span>
                                <ArchiveIcon size={18} />
                            </button>
                        </div>
                    </article>

                    <aside className="document-access-card">
                        <div className="document-card-header">
                            <h2>Users with Access</h2>
                        </div>

                        <ul className="document-user-list">
                            {usersWithAccess.map((user, index) => (
                                <li key={`user-${user.email || user.name || index}`}>
                                    <button
                                        type="button"
                                        className={`document-user-item ${selectedUser === user ? 'active' : ''}`}
                                        onClick={() => setSelectedUser(user)}
                                    >
                                        {user.name}
                                    </button>
                                </li>
                            ))}
                        </ul>

                        {selectedUser && (
                            <div className="document-user-details">
                                <h3>{selectedUser.name}</h3>
                                <p>
                                    <MailIcon />
                                    <span>{selectedUser.email}</span>
                                </p>
                            </div>
                        )}
                    </aside>
                </section>

                <section className="document-chat-section">
                    <DocumentChat documentId={id} />
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default DocumentView;
