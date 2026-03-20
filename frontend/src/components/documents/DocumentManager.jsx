import React, { useState, useCallback, memo } from 'react';
import { Link } from 'react-router-dom';
import Upload from '../../Upload';
import { ArchiveIcon, CheckIcon, DatabaseIcon, FileIcon, StarIcon, UploadIcon } from '../icons/Icons';

const DocumentManager = memo(({ documents, toggleStar, onUploadClick }) => {
    const [activeTab, setActiveTab] = useState('featured');
    const [uploadOpen, setUploadOpen] = useState(false);

    const handleOpenUpload = useCallback(() => setUploadOpen(true), []);
    const handleCloseUpload = useCallback(() => setUploadOpen(false), []);

    return (
        <section className="document-manager-container">
            <div className="action-buttons-grid">
                <button className="action-btn" onClick={handleOpenUpload}>
                    <UploadIcon />
                    <span>Upload</span>
                </button>
                <Link to="/database" className="action-btn">
                    <DatabaseIcon />
                    <span>Database</span>
                </Link>
                <button className="action-btn">
                    <ArchiveIcon />
                    <span>Archive</span>
                </button>
            </div>

            {uploadOpen && <Upload onClose={handleCloseUpload} onUpload={onUploadClick} />}

            <div className="doc-tabs">
                <button className={activeTab === 'featured' ? 'active' : ''} onClick={() => setActiveTab('featured')}>
                    <CheckIcon />
                    <span>Featured Documents</span>
                </button>
                <button className={activeTab === 'recent' ? 'active' : ''} onClick={() => setActiveTab('recent')}>
                    <span>Recently Viewed Documents</span>
                </button>
            </div>

            <div className="document-list-container">
                <div className="doc-list-header">
                    <span className="doc-list-icon" aria-label="Starred"><StarIcon size={16} /></span>
                    <span>Document Title</span>
                    <span>Description</span>
                    <span>Category</span>
                    <span className="text-right">Time</span>
                </div>
                {documents.length === 0 ? (
                    <div className="empty-state">
                        <span className="empty-icon" aria-hidden="true"><FileIcon size={26} /></span>
                        <p>No documents yet. Upload your first document.</p>
                    </div>
                ) : (
                    <ul className="doc-list">
                        {documents.map((doc) => (
                            <Link to={`/document/${doc.id}`} key={doc.id} className="document-link">
                                <li>
                                    <button
                                        type="button"
                                        className={`star-toggle ${doc.starred ? 'star-active' : 'star-inactive'}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            toggleStar(doc.id);
                                        }}
                                        aria-label={doc.starred ? 'Remove from featured' : 'Mark as featured'}
                                    >
                                        <StarIcon filled={doc.starred} />
                                    </button>
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
