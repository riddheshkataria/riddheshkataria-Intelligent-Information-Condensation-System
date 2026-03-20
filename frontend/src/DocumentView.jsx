import React, { useState } from 'react';
import './DocumentView.css';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Make sure useNavigate is also imported
import { getDocumentStatus } from './services/api.js';

// --- Reusable Icons ---
const ProfileIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const ArrowLeftIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>;
const ArchiveIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line></svg>;
const MailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;
const PhoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>;

// --- Header Component ---
const PageHeader = () => (
    <header className="page-header">
        <div className="logo-section"><img src="/logo.png" alt="IICS Logo" className="header-logo" /><span className="header-title">IICS</span></div>
        <div className="header-controls"><button className="profile-button" aria-label="Profile"><ProfileIcon /></button></div>
    </header>
);

// --- Main Document View Component ---
// REPLACE your old DocumentView function with this
const DocumentView = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Get the document ID from the URL

    const [document, setDocument] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        const fetchDocument = async () => {
            try {
                const docData = await getDocumentStatus(id);
                setDocument(docData);
                // Default the selected user to be the document's owner
                if (docData.user) {
                    setSelectedUser(docData.user);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchDocument();
    }, [id]);

    const handleFetchOriginal = () => {
        const token = localStorage.getItem('userToken');
        const fileUrl = `http://localhost:5000/api/docs/file/${id}`;

        fetch(fileUrl, { headers: { 'Authorization': `Bearer ${token}` } })
            .then(res => res.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                window.open(url, '_blank'); // Opens the PDF in a new tab
            })
            .catch(err => {
                console.error("Failed to fetch document file:", err);
                setError("Could not open document.");
            });
    };

    const handleGoBack = () => navigate(-1);

    if (loading) return <div>Loading document...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!document) return <div>Document not found.</div>;

    // Combine the owner and shared users into one list for display
    const usersWithAccess = [document.user, ...document.sharedWith].filter(Boolean);

    return (
        <div className="document-view-page">
            <PageHeader />
            <main className="document-container">
                <button className="previous-page-btn" onClick={handleGoBack}><ArrowLeftIcon /><span>Back</span></button>

                <div className="content-grid">
                    <div className="document-details-column">
                        <div className="document-header">
                            <h1>{document.originalFilename}</h1>
                            <div className="document-meta">
                                <span>Status: <strong>{document.status}</strong></span>
                            </div>
                        </div>
                        <section className="summary-section">
                            <h2>Generated Summary</h2>
                            <div className="summary-content-box">
                                <p>{document.summary || "No summary available."}</p>
                            </div>
                        </section>
                        <div className="document-actions">
                            <button className="action-btn fetch-btn" onClick={handleFetchOriginal}>Fetch Original Document</button>
                            <button className="action-btn archive-btn">
                                <span>Archive</span><ArchiveIcon />
                            </button>
                        </div>
                    </div>

                    <aside className="user-access-column">
                        <h2>Users with Access</h2>
                        <ul className="user-list">
                            {usersWithAccess.map(user => (
                                <li
                                    key={user._id}
                                    className={`user-item ${selectedUser && selectedUser._id === user._id ? 'active' : ''}`}
                                    onClick={() => setSelectedUser(user)}
                                >
                                    {user.name}
                                </li>
                            ))}
                        </ul>
                        {selectedUser && (
                            <div className="user-details-box">
                                <h3>{selectedUser.name}</h3>
                                <div className="contact-info">
                                    <span><MailIcon /> {selectedUser.email}</span>
                                    {/* Phone number can be added to the User model later */}
                                </div>
                            </div>
                        )}
                    </aside>
                </div>
            </main>
        </div>
    );
};

export default DocumentView;
