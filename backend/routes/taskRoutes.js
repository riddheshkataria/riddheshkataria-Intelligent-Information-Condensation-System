import express from 'express';
import { createTask, getTasks, updateTask, deleteTask, searchTasks } from '../controllers/taskController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All task routes are protected, so they require a valid token.
router.post('/', protect, createTask);
router.get('/', protect, getTasks);
// Search must come before /:id so "search" isn't treated as an ID
router.get('/search', protect, searchTasks);
router.put('/:id', protect, updateTask);
router.delete('/:id', protect, deleteTask);

export default router;
