const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Fetches all documents from the backend.
 * @returns {Promise<Array>} A promise that resolves to an array of documents.
 */
// REPLACE the old getDocuments function with this one
export const getDocuments = async (limit = 0) => { // Default to 0 (no limit)
  let url = `${API_BASE_URL}/docs`;
  if (limit > 0) {
    url += `?limit=${limit}`; // Add the limit to the URL if provided (e.g., /api/docs?limit=5)
  }

  const token = localStorage.getItem('userToken');
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch documents');
  }
  return response.json();
};

/**
 * Uploads a new document file.
 * @param {File} file The file to upload.
 * @returns {Promise<Object>} A promise that resolves to the initial server response.
 */
export const uploadDocument = async (file, additionalData) => {
  const token = localStorage.getItem('userToken');
  const formData = new FormData();
  formData.append('file', file);
  formData.append('pastedText', additionalData.pastedText);
  formData.append('cloudLink', additionalData.cloudLink);
  formData.append('sources', JSON.stringify(additionalData.sources));

  const response = await fetch(`${API_BASE_URL}/docs/upload`, {
    method: 'POST',
    headers: {
        // NOTE: We don't set 'Content-Type' for formData, the browser does it.
        'Authorization': `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error('File upload failed');
  }
  return response.json();
};
/**
 * Checks the processing status of a single document.
 * @param {string} documentId The ID of the document to check.
 * @returns {Promise<Object>} A promise that resolves to the full document object.
 */
export const getDocumentStatus = async (documentId) => {
  const token = localStorage.getItem('userToken'); // Get the token from storage
  const response = await fetch(`${API_BASE_URL}/docs/status/${documentId}`, {
    headers: {
      // Add the Authorization header
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to get document status');
  }
  return response.json();
};

// ADD THESE TWO NEW FUNCTIONS

/**
 * Fetches all tasks for the logged-in user.
 * It includes the auth token in the request header.
 */
export const getTasks = async () => {
  const token = localStorage.getItem('userToken');
  const response = await fetch(`${API_BASE_URL}/tasks`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }
  return response.json();
};

/**
 * Updates the status of a specific task.
 * It includes the auth token in the request header.
 * @param {string} taskId The ID of the task to update.
 * @param {string} status The new status (e.g., "completed").
 */
export const updateTaskStatus = async (taskId, status) => {
  const token = localStorage.getItem('userToken');
  const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) {
    throw new Error('Failed to update task');
  }
  return response.json();
};

// ADD THIS NEW FUNCTION
/**
 * Creates a new task.
 * @param {object} taskData The data for the new task.
 */
export const createTask = async (taskData) => {
  const token = localStorage.getItem('userToken');
  const response = await fetch(`${API_BASE_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(taskData),
  });
  if (!response.ok) {
    throw new Error('Failed to create task');
  }
  return response.json();
};

