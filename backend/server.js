import express from 'express';
import cors from 'cors';
import 'dotenv/config'; // Ensures environment variables are loaded
import connectDB from './config/db.js';

// --- Route Imports ---
import docRoutes from './routes/docRoutes.js';
import userRoutes from './routes/userRoutes.js'; // 1. IMPORT the user routes
import taskRoutes from './routes/taskRoutes.js';
// --- Middleware Imports ---
import { errorHandler } from './middleware/errorMiddleware.js'; // 2. IMPORT the error handler

// --- Server Initialization ---
const app = express();
const PORT = process.env.PORT || 5000;

// --- Database Connection ---
connectDB();

// --- Core Middleware ---
app.use(cors());
app.use(express.json());

// --- API Routes ---
app.use('/api/docs', docRoutes);
app.use('/api/users', userRoutes); // 3. USE the user routes
app.use('/api/tasks', taskRoutes);
// --- Global Error Handler ---
// This MUST be the last piece of middleware.
app.use(errorHandler); // 4. USE the error handler

// --- Start the Server ---
app.listen(PORT, () =>
  console.log(`🚀 Backend running on port ${PORT}`)
);

