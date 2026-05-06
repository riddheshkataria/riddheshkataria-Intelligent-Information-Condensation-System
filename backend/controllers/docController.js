import Document from '../models/Document.js';
import fs from 'fs/promises'; // Use the modern, promise-based version of fs
import path from 'path';     // Import the path module
import { extractText } from '../utils/textExtractor.js';
import { processDocumentWithGemini, chatWithDocument, generateEmbedding, generateEmbeddingsBatch } from '../services/geminiService.js';
import Task from '../models/Task.js';
import User from '../models/User.js';
import { chunkText } from '../utils/chunker.js';
import { findTopKSimilar } from '../utils/vectorSearch.js';

// This is the main function that handles the file upload and triggers background processing.
export const uploadDoc = async (req, res) => {
  // --- 1. Immediate Action: Validate and Save Initial Record ---
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  try {
    // Get the extra data from the request body
    const { sources, pastedText, cloudLink } = req.body;

    const newDoc = new Document({
      user: req.user.id,
      originalFilename: req.file.originalname,
      storagePath: req.file.path,
      status: 'processing',
      // Add the new fields here
      pastedText: pastedText || '',
      cloudLink: cloudLink || '',
      // Sources will be a JSON string, so we need to parse it
      source: sources ? JSON.parse(sources) : [],
    });
    await newDoc.save();

    // --- 2. Respond Immediately to the User ---
    res.status(202).json({
      message: 'File uploaded and is being processed.',
      documentId: newDoc._id,
    });

    // --- 3. Trigger Background Processing ---
    processDocument(newDoc._id, req.file.path);
  } catch (error) {
    console.error('Error during initial document save:', error);
    res.status(500).json({ error: 'Failed to start file processing.' });
  }
};

// --- Background Processing (LIVE NLP INTEGRATION) ---
const processDocument = async (docId, filePath) => {
  try {
    // Call our new Gemini service directly with the file path
    const mlResult = await processDocumentWithGemini(filePath, 'application/pdf');

    // Step C: Destructure the rich data from the REAL response
    const {
      summary,
      entities,
      categories, // We'll use this as our documentType
      tags,
      important_dates,
      names
    } = mlResult;

    // --- NEW RAG STEP: Extract text, chunk, and embed ---
    console.log(`Starting RAG processing for document ${docId}...`);
    const fullText = await extractText(filePath);
    const chunks = chunkText(fullText, 1000, 200);
    console.log(`Extracted ${chunks.length} chunks. Generating embeddings...`);
    const documentChunks = await generateEmbeddingsBatch(chunks);
    console.log(`Generated embeddings for ${documentChunks.length} chunks.`);

    // Step D: Update the document in the DB with all the new, real data
    const updatedDoc = await Document.findByIdAndUpdate(
      docId,
      {
        status: 'completed',
        fullText: fullText, // Optionally save the full text
        summary: summary || 'No summary available.',
        entities: entities || [],
        // Use the 'categories' from the response as our 'documentType'
        documentType: categories && categories.length > 0 ? categories[0] : 'Unclassified',
        tags: tags || [],
        importantDates: important_dates || [],
        people: names || [],
        documentChunks: documentChunks // Save chunks and embeddings
      },
      { new: true } // This option returns the updated document
    );

    // Step E: Trigger the next part of the workflow: task creation and routing
    // We will build out this function in the next step.
    await createAndRouteTask(updatedDoc);

    console.log(`✅ Successfully processed document with live NLP service: ${docId}`);

  } catch (error) {
    console.error(`❌ Failed to process document ${docId}:`, error);
    // If any step fails, we mark the document as 'failed' in the database
    await Document.findByIdAndUpdate(docId, { status: 'failed' });
  }
};



// --- Other Controller Functions ---
// (getDocById, getDocs, searchDocs remain the same)

export const getDocById = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id)
      .populate('user', 'name email role') // Populate the owner's details
      .populate('sharedWith', 'name email role'); // Populate the details of users it's shared with
    if (!doc) {
      return res.status(404).json({ error: 'Document not found.' });
    }
    res.status(200).json(doc);
  } catch (error) {
    res.status(500).json({ error: 'Server error.' });
  }
};

// REPLACE the old getDocs function with this one
// REPLACE the old getDocs function with this one
// REPLACE the old getDocs function with this one
export const getDocs = async (req, res) => {
  try {
    // Read the 'limit' from the URL query (e.g., /api/docs?limit=5)
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : null;

    let query = Document.find({
      $or: [
        { user: req.user.id },
        { sharedWith: req.user.id }
      ]
    }).sort({ updatedAt: -1 }); // Sort by most recently updated first

    // If a valid limit is provided in the URL, apply it to the query
    if (limit && limit > 0) {
      query.limit(limit);
    }

    const docs = await query.exec(); // Execute the final query

    res.status(200).json(docs);
  } catch (error) {
    res.status(500).json({ error: 'Server error.' });
  }
};

export const searchDocs = async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res.status(400).json({ error: 'Search query is required.' });
    }
    const docs = await Document.find({ $text: { $search: query } });
    res.status(200).json(docs);
  } catch (error) {
    res.status(500).json({ error: 'Server error.' });
  }
};

// ADD THIS ENTIRE NEW FUNCTION
export const shareDocument = async (req, res) => {
  try {
    const { email } = req.body; // The email of the user to share with
    const document = await Document.findById(req.params.id);

    // 1. Check if the document exists
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    // 2. Check if the person trying to share is the owner of the document
    if (document.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized to share this document' });
    }

    // 3. Find the user to share with
    const userToShareWith = await User.findOne({ email });
    if (!userToShareWith) {
      return res.status(404).json({ message: `User with email ${email} not found` });
    }

    // 4. Prevent sharing with the owner or if already shared
    if (document.user.toString() === userToShareWith._id.toString()) {
      return res.status(400).json({ message: 'Cannot share document with the owner.' });
    }
    if (document.sharedWith.some(id => id.toString() === userToShareWith._id.toString())) {
      return res.status(400).json({ message: 'Document already shared with this user.' });
    }

    // 5. Add the user to the sharedWith array and save
    document.sharedWith.push(userToShareWith._id);
    await document.save();

    res.status(200).json({ message: `Document successfully shared with ${email}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const createAndRouteTask = async (document) => {
  try {
    let targetRole = null;
    let taskTitle = `New Document for Review: ${document.originalFilename}`;
    let taskDescription = `Please review the attached document summary. Type: ${document.documentType}.`;

    // This is the business logic for routing based on document type
    const docTypeLower = document.documentType.toLowerCase();
    if (['engineer', 'admin', 'manager'].includes(docTypeLower)) {
      // Capitalize the first letter for the role
      targetRole = docTypeLower.charAt(0).toUpperCase() + docTypeLower.slice(1);
    } else {
      // Default fallback
      targetRole = 'Manager';
    }

    const targetUsers = await User.find({ role: targetRole });

    if (targetUsers && targetUsers.length > 0) {
      // 1. Create tasks for all users
      const tasksToCreate = targetUsers.map(user => ({
        title: taskTitle,
        description: taskDescription,
        assignedTo: user._id,
        relatedDocument: document._id,
        status: 'pending',
      }));
      await Task.insertMany(tasksToCreate);

      // 2. Add these users to the document's sharedWith array so they can access it
      const newAssigneeIds = targetUsers.map(user => user._id);
      await Document.findByIdAndUpdate(document._id, {
        $addToSet: { sharedWith: { $each: newAssigneeIds } }
      });

      console.log(`✅ Tasks created for document ${document._id} and assigned to ${targetUsers.length} users with role: ${targetRole}`);
    } else {
      console.warn(`⚠️ No user found with role: "${targetRole}" for document ${document._id}. Task not created.`);
    }
  } catch (error) {
    console.error(`❌ Failed to create task for document ${document._id}:`, error);
  }
};

// Helper function to find a specific entity value from the NLP response
const findEntity = (entities, type) => {
  if (!entities || !Array.isArray(entities)) return 'N/A';
  const entity = entities.find(e => e.type && e.type.toUpperCase() === type.toUpperCase());
  return entity ? entity.value : 'N/A';
};

// ADD THIS ENTIRE NEW FUNCTION
export const getDocumentFile = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    // Security Check: Ensure the user owns the document or it's shared with them
    const isOwner = document.user.toString() === req.user.id;
    const isShared = document.sharedWith.some(id => id.toString() === req.user.id);

    if (!isOwner && !isShared) {
      return res.status(401).json({ message: 'User not authorized to access this file' });
    }

    // This sends the file from the path stored in the database
    const fullPath = path.resolve(document.storagePath);
    
    try {
      // Check if the file actually exists on the filesystem
      await fs.access(fullPath);
      res.sendFile(fullPath, (err) => {
        if (err) {
          console.error('Error sending file:', err);
          if (!res.headersSent) {
            res.status(500).json({ message: 'Error sending file' });
          }
        }
      });
    } catch (fsError) {
      console.error('File missing on disk:', fullPath);
      return res.status(404).json({ message: 'The requested document file no longer exists on the server.' });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ADD THIS ENTIRE NEW FUNCTION
export const archiveDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    // Security Check: Ensure the user owns the document
    if (document.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized to archive this document' });
    }

    document.isArchived = true;
    await document.save();

    res.status(200).json({ message: 'Document successfully archived' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ADD THIS ENTIRE NEW FUNCTION
export const chatWithDoc = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    // Security Check: Ensure the user owns the document or it's shared with them
    const isOwner = document.user.toString() === req.user.id;
    const isShared = document.sharedWith.some(id => id.toString() === req.user.id);

    if (!isOwner && !isShared) {
      return res.status(401).json({ message: 'User not authorized to access this document' });
    }

    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ message: 'Message is required' });
    }

    let relevantChunks = [];
    
    // Check if we have pre-computed chunks and embeddings for this document
    if (document.documentChunks && document.documentChunks.length > 0) {
        console.log(`[RAG] Finding relevant chunks for document ${document._id}...`);
        // 1. Generate embedding for the user's question
        const queryEmbedding = await generateEmbedding(message);
        
        // 2. Perform vector search to find top K chunks
        const topK = 5; // Find top 5 chunks
        const similarChunks = findTopKSimilar(queryEmbedding, document.documentChunks, topK);
        
        relevantChunks = similarChunks.map(sc => ({ text: sc.text }));
        console.log(`[RAG] Selected ${relevantChunks.length} chunks. Top score: ${similarChunks[0]?.score}`);
    } else {
        console.warn(`[RAG] Document ${document._id} does not have documentChunks. Using empty context (or fallback).`);
        // Fallback: we could pass the entire fullText here if we want, but chunks are expected
        // We'll pass an empty array, and the LLM will just answer based on history or nothing.
        // If we wanted to fallback to full document, we'd have to re-read the file.
        // For now, let's fallback to the fullText if available, chunked loosely.
        if (document.fullText) {
             relevantChunks = [{ text: document.fullText.substring(0, 15000) }]; // limit fallback
        }
    }

    // Call the new chat service that takes relevant chunks instead of the full file
    const reply = await chatWithDocument(relevantChunks, history || [], message);

    res.status(200).json({ reply });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error during chat' });
  }
};