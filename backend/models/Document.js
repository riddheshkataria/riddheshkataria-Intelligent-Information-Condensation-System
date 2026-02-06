import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema(
  {
    originalFilename: {
      type: String,
      required: true,
    },
    // The path where the file is stored (e.g., 'uploads/12345.pdf')
    storagePath: {
      type: String,
      required: true,
    },
    // The status of the document processing
    status: {
      type: String,
      enum: ['processing', 'completed', 'failed'],
      default: 'processing',
    },
    source: {
      type: [String], // An array of strings like ["E-mail", "WhatsApp PDFs"]
    },
    pastedText: {
      type: String,
    },
    cloudLink: {
      type: String,
    },
    // The full extracted text from the document
    fullText: {
      type: String,
    },
    // The final summary from the ML service
    summary: {
      type: String,
    },
    // Any entities extracted by the ML service
    entities: {
      type: [Object], // Store entities as an array of objects
    },
    documentType: {
      type: String,
      default: 'Unclassified',
    },
    tags: {
      type: [String], // An array of strings
    },
    importantDates: {
      type: [String],
    },
    people: {
      type: [String],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // This creates a link to the User model
    },
    sharedWith: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
    // Link to the user who uploaded it (we'll use this later for RBAC)
    // uploadedBy: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'User',
    // },
  },
  {
    // This automatically adds `createdAt` and `updatedAt` fields
    timestamps: true,
  }
);

// Add a text index for efficient searching later on
documentSchema.index({ fullText: 'text', summary: 'text' });

const Document = mongoose.model('Document', documentSchema);
export default Document;
