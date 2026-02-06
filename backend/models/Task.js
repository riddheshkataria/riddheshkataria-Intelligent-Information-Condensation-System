import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    // This is the crucial field that links the task to a specific user.
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // Creates a direct reference to a document in the 'User' collection
    },
    // This links the task back to the source document that created it.
    relatedDocument: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Document', // Creates a direct reference to a document in the 'Document' collection
    },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed'],
      default: 'pending',
    },
    dueDate: {
      type: Date,
    },
  },
  {
    // This automatically adds `createdAt` and `updatedAt` fields
    timestamps: true,
  }
);

const Task = mongoose.model('Task', taskSchema);
export default Task;

