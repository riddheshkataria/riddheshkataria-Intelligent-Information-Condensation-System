import Task from '../models/Task.js';

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
export const createTask = async (req, res) => {
  try {
    const { title, description, deadline, urgency, relatedDocument } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Task title is required' });
    }

    const taskData = {
      title,
      description,
      deadline,
      urgency,
      assignedTo: req.user.id,
    };

    // Only add relatedDocument if it's a valid value
    if (relatedDocument && relatedDocument !== 'None') {
      taskData.relatedDocument = relatedDocument;
    }

    const task = new Task(taskData);
    const createdTask = await task.save();

    // Populate the relatedDocument before sending the response
    const populatedTask = await Task.findById(createdTask._id)
      .populate('relatedDocument', 'originalFilename');

    res.status(201).json(populatedTask);
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
    const tasks = await Task.find({ assignedTo: req.user.id })
      .populate('relatedDocument', 'originalFilename')
      .sort({ createdAt: -1 });

    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update a task (e.g., mark as completed)
// @route   PUT /api/tasks/:id
// @access  Private
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.assignedTo.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized to update this task' });
    }

    task.status = req.body.status || task.status;
    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.deadline = req.body.deadline || task.deadline;
    task.urgency = req.body.urgency || task.urgency;

    const updatedTask = await task.save();
    const populatedTask = await Task.findById(updatedTask._id)
      .populate('relatedDocument', 'originalFilename');

    res.status(200).json(populatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.assignedTo.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized to delete this task' });
    }

    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Task removed' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};