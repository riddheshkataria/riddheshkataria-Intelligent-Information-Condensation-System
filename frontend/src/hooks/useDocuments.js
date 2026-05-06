import { useState, useCallback } from 'react';
import { getDocuments, uploadDocument, getDocumentStatus, archiveDocument, unarchiveDocument } from '../services/api';

// Formats raw backend doc to the shape the UI expects
const formatDoc = (doc) => ({
    id: doc._id,
    title: doc.originalFilename,
    description: doc.summary || (doc.status === 'processing' ? 'Processing...' : 'No summary available.'),
    category: doc.documentType || 'Unclassified',
    time: new Date(doc.createdAt).toLocaleTimeString(),
    status: doc.status,
    starred: doc.isArchived || false,
    view: 'recent',
    isArchived: doc.isArchived || false,
});

export const useDocuments = () => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDocuments = useCallback(async (limit = 5) => {
        try {
            setLoading(true);
            const fetched = await getDocuments(limit);
            setDocuments(fetched.map(formatDoc));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    const startPolling = useCallback((documentId) => {
        const intervalId = setInterval(async () => {
            try {
                const doc = await getDocumentStatus(documentId);
                if (doc.status === 'completed' || doc.status === 'failed') {
                    clearInterval(intervalId);
                    // Refresh the list once processing finishes
                    const fetched = await getDocuments(5);
                    setDocuments(fetched.map(formatDoc));
                }
            } catch (pollError) {
                console.error('Polling error:', pollError);
                clearInterval(intervalId);
            }
        }, 5000);
        return intervalId;
    }, []);

    const handleUpload = useCallback(async (file, additionalData) => {
        try {
            const response = await uploadDocument(file, additionalData);
            const { documentId } = response;

            // Immediately show a placeholder in the UI
            setDocuments((prev) => [
                { id: documentId, title: file.name, description: 'Uploading & Processing...', status: 'processing', view: 'recent' },
                ...prev,
            ]);

            // Start polling for completion
            startPolling(documentId);
        } catch (err) {
            setError(err.message);
        }
    }, [startPolling]);

    const toggleStar = useCallback(async (docId) => {
        const originalDoc = documents.find((d) => d.id === docId);
        if (!originalDoc) return;

        // Optimistically update
        setDocuments((prev) =>
            prev.map((doc) => (doc.id === docId ? { ...doc, starred: !doc.starred, isArchived: !doc.isArchived } : doc))
        );

        try {
            if (originalDoc.isArchived) {
                await unarchiveDocument(docId);
            } else {
                await archiveDocument(docId);
            }
        } catch (err) {
            console.error('Failed to toggle archive status:', err);
            setDocuments((prev) =>
                prev.map((doc) => (doc.id === docId ? { ...doc, starred: originalDoc.starred, isArchived: originalDoc.isArchived } : doc))
            );
            setError(err.message);
        }
    }, [documents]);

    const clearError = useCallback(() => setError(null), []);

    return {
        documents,
        setDocuments,
        loading,
        error,
        fetchDocuments,
        handleUpload,
        toggleStar,
        clearError,
    };
};
