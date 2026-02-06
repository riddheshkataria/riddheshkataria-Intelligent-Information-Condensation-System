import Task from '../models/Task.js';


// ADD THIS NEW FUNCTION
// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
export const createTask = async (req, res) => {
  try {
    const { title, description, deadline, urgency, relatedDocument } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Task title is required' });
    }

    const task = new Task({
      title,
      description,
      deadline,
      urgency,
      relatedDocument: relatedDocument !== 'None' ? relatedDocument : null,
      assignedTo: req.user.id, // Link the task to the logged-in user
    });

    const createdTask = await task.save();
    res.status(201).json(createdTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
// @desc    Get tasks for the logged-in user
// @route   GET /api/tasks
// @access  Private
export const getTasks = async (req, res) => {
  try {
    // Find all tasks where the 'assignedTo' field matches the logged-in user's ID
    const tasks = await Task.find({ assignedTo: req.user.id })
      .populate('relatedDocument', 'originalFilename') // Include the original filename from the document
      .sort({ createdAt: -1 }); // Show newest tasks first

    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update a task (e.g., mark as completed)
// @route   PUT /api/tasks/:id
// @access  Private
// Add these logs inside the updateTask function
export const updateTask = async (req, res) => {
  try {
    // --- ADD LOGS FOR DEBUGGING ---
    console.log(`--- Updating Task: ${req.params.id} ---`);
    console.log('User making request:', req.user.id);
    console.log('New status from request body:', req.body.status);
    // ----------------------------

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.assignedTo.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized to update this task' });
    }

    task.status = req.body.status || task.status;

    // --- ADD MORE LOGS ---
    console.log('Task object BEFORE saving:', task);
    // -------------------

    const updatedTask = await task.save();

    // --- ADD FINAL LOG ---
    console.log('Task object AFTER saving:', updatedTask);
    console.log('--- Update Complete ---');
    // -------------------

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};