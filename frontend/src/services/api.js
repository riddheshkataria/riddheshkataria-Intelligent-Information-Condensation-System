const API_BASE_URL = 'http://localhost:5000/api';

const getToken = () => localStorage.getItem('userToken');

const authHeaders = () => ({
    'Authorization': `Bearer ${getToken()}`,
});

const jsonAuthHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getToken()}`,
});

// --- Document APIs ---

export const getDocuments = async (limit = 0) => {
    let url = `${API_BASE_URL}/docs`;
    if (limit > 0) url += `?limit=${limit}`;

    const response = await fetch(url, { headers: authHeaders() });
    if (!response.ok) throw new Error('Failed to fetch documents');
    return response.json();
};

export const uploadDocument = async (file, additionalData) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('pastedText', additionalData.pastedText);
    formData.append('cloudLink', additionalData.cloudLink);
    formData.append('sources', JSON.stringify(additionalData.sources));

    const response = await fetch(`${API_BASE_URL}/docs/upload`, {
        method: 'POST',
        headers: authHeaders(),
        body: formData,
    });
    if (!response.ok) throw new Error('File upload failed');
    return response.json();
};

export const getDocumentStatus = async (documentId) => {
    const response = await fetch(`${API_BASE_URL}/docs/status/${documentId}`, {
        headers: authHeaders(),
    });
    if (!response.ok) throw new Error('Failed to get document status');
    return response.json();
};

// --- Task APIs ---

export const getTasks = async () => {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
        headers: authHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch tasks');
    return response.json();
};

export const updateTaskStatus = async (taskId, status) => {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
        method: 'PUT',
        headers: jsonAuthHeaders(),
        body: JSON.stringify({ status }),
    });
    if (!response.ok) throw new Error('Failed to update task');
    return response.json();
};

export const createTask = async (taskData) => {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: 'POST',
        headers: jsonAuthHeaders(),
        body: JSON.stringify(taskData),
    });
    if (!response.ok) throw new Error('Failed to create task');
    return response.json();
};

export const deleteTask = async (taskId) => {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
        method: 'DELETE',
        headers: authHeaders(),
    });
    if (!response.ok) throw new Error('Failed to delete task');
    return response.json();
};

// --- User APIs ---

export const loginUser = async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Login failed');
    return data;
};
