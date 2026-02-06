import express from 'express';
import { createTask, getTasks, updateTask } from '../controllers/taskController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All task routes are protected, so they require a valid token.
// Route to create a new task
router.post('/', protect, createTask);

// Route to get all tasks assigned to the current user
router.get('/', protect, getTasks);

// Route to update a specific task (e.g., change its status)
router.put('/:id', protect, updateTask);
export default router;
