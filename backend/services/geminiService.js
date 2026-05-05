import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs/promises';

// Initialize the generic AI helper to resolve conditionally when called
// so that process.env is successfully populated by dotenv config.
export const processDocumentWithGemini = async (filePath, mimeType = 'application/pdf') => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing in environment variables.");
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: 'gemini-flash-latest',
    generationConfig: {
      responseMimeType: 'application/json',
    }
  });

  try {
    const fileBuffer = await fs.readFile(filePath);
    
    // Convert to inlineData format suitable for Gemini
    const filePart = {
      inlineData: {
        data: fileBuffer.toString("base64"),
        mimeType
      }
    };

    const prompt = `
    Analyze the attached document and provide a structured JSON output with the following exact keys:
    - "summary": A concise summary of the document.
    - "entities": A list of important entities (organizations, locations, concepts, etc.) found in the document.
    - "categories": A list containing exactly one category for the document. You MUST choose from the following list: "Engineer", "Admin", "Manager".
    - "tags": A list of relevant lowercase keywords representing the topics of the document.
    - "important_dates": A list of any important dates or deadlines mentioned.
    - "names": A list of full names of people mentioned in the document.

    Return ONLY the raw JSON object matching the requested schema. Do not enclose it in markdown blocks (\`\`\`json). I will parse it directly.
    `;

    let result;
    let retries = 3;
    while (retries > 0) {
      try {
        result = await model.generateContent([filePart, prompt]);
        break;
      } catch (error) {
        console.warn(`Gemini API Warning. Retries left: ${retries - 1}. Error: ${error.message}`);
        retries--;
        if (retries === 0) throw error;
        await new Promise(resolve => setTimeout(resolve, 2000)); // wait 2s before retry
      }
    }

    let responseText = result.response.text();

    // Sometimes the model might wrap response in markdown code blocks anyway
    // even and despite using request config. Clean it up just in case:
    responseText = responseText.replace(/```json/gi, '').replace(/```/g, '').trim();

    return JSON.parse(responseText);

  } catch (error) {
    console.error("Error processing document with Gemini:", error);
    throw error;
  }
};

export const chatWithDocument = async (filePath, mimeType = 'application/pdf', history = [], message) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing in environment variables.");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  // We use flash for chat since it's fast and has large context
  const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });

  try {
    const fileBuffer = await fs.readFile(filePath);
    
    const filePart = {
      inlineData: {
        data: fileBuffer.toString("base64"),
        mimeType
      }
    };

    // Construct the contents array for the chat history
    const contents = [];
    
    for (let i = 0; i < history.length; i++) {
        const item = history[i];
        const parts = [{ text: item.text }];
        
        // Inject the document into the very first user message of the conversation
        if (i === 0 && item.role === 'user') {
            parts.unshift(filePart);
            parts[1].text = `Document Context:\n(Attached File)\n\nUser Question:\n${item.text}`;
        }
        
        contents.push({
            role: item.role,
            parts: parts
        });
    }

    // Now handle the new message
    const newMessageParts = [{ text: message }];
    
    // If history was empty, this new message is the first message
    if (history.length === 0) {
        newMessageParts.unshift(filePart);
        newMessageParts[1].text = `You are a helpful AI assistant. Answer the user's questions based primarily on the attached document. If the document does not contain the answer, say so.\n\nUser Question:\n${message}`;
    }

    contents.push({
        role: 'user',
        parts: newMessageParts
    });

    const result = await model.generateContent({ contents });
    return result.response.text();

  } catch (error) {
    console.error("Error chatting with document using Gemini:", error);
    throw error;
  }
};
