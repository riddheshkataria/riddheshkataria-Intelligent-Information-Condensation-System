import express from 'express';
import multer from 'multer';
import { protect } from '../middleware/authMiddleware.js';
import { uploadDoc, getDocs, getDocById, searchDocs, shareDocument, getDocumentFile  } from '../controllers/docController.js'

const router = express.Router();

// --- Multer Configuration ---
// This logic is now self-contained within the router that uses it.
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // IMPORTANT: Make sure the 'uploads' directory exists in your backend folder.
    // Multer does not create the directory for you.
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });
// --------------------------

// Route for uploading a new document
// POST /api/docs/upload
router.post('/upload', protect, upload.single('file'), uploadDoc);
// ADD THIS NEW ROUTE
// @route   POST /api/docs/:id/share
// @desc    Share a document with another user
// @access  Private (Owner only)
router.post('/:id/share', protect, shareDocument);
// Route for getting the status/details of a single document
// GET /api/docs/status/:id
router.get('/status/:id', protect, getDocById);

// ADD THIS NEW ROUTE
// @route   GET /api/docs/file/:id
// @desc    Get the physical document file
// @access  Private
router.get('/file/:id', protect, getDocumentFile);
// Route for getting all documents
// GET /api/docs/
router.get('/', protect, getDocs);

// Route for searching documents
// GET /api/docs/search?q=...
router.get('/search', protect, searchDocs);

export default router;

