import React, { useState, useMemo, useCallback, memo } from 'react';
import { Link } from 'react-router-dom';
import Upload from '../../Upload';
import { UploadIcon, DatabaseIcon, ArchiveIcon, CheckIcon } from '../icons/Icons';

const DocumentManager = memo(({ documents, toggleStar, onUploadClick }) => {
    const [activeTab, setActiveTab] = useState('featured');
    const [uploadOpen, setUploadOpen] = useState(false);

    const handleOpenUpload = useCallback(() => setUploadOpen(true), []);
    const handleCloseUpload = useCallback(() => setUploadOpen(false), []);

    return (
        <section className="document-manager-container">
            <div className="action-buttons-grid">
                <button className="action-btn" onClick={handleOpenUpload}>
                    <UploadIcon /><span>Upload</span>
                </button>
                <Link to="/database" className="action-btn">
                    <DatabaseIcon /><span>Database</span>
                </Link>
                <button className="action-btn">
                    <ArchiveIcon /><span>Archive</span>
                </button>
            </div>

            {uploadOpen && <Upload onClose={handleCloseUpload} onUpload={onUploadClick} />}

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
                {documents.length === 0 ? (
                    <div className="empty-state">
                        <span className="empty-icon">📄</span>
                        <p>No documents yet. Upload your first document!</p>
                    </div>
                ) : (
                    <ul className="doc-list">
                        {documents.map((doc) => (
                            <Link to={`/document/${doc.id}`} key={doc.id} className="document-link">
                                <li>
                                    <span
                                        className={doc.starred ? 'star-active' : 'star-inactive'}
                                        onClick={(e) => { e.preventDefault(); toggleStar(doc.id); }}
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
                )}
            </div>
        </section>
    );
});

DocumentManager.displayName = 'DocumentManager';
export default DocumentManager;
