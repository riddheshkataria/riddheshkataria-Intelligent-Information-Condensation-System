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
    model: 'gemini-2.5-flash',
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
    - "categories": A list of applicable categories for the document (e.g. "Operations & Maintenance", "Finance", "Human Resources", "Safety & Security", "Legal", "General").
    - "tags": A list of relevant lowercase keywords representing the topics of the document.
    - "important_dates": A list of any important dates or deadlines mentioned.
    - "names": A list of full names of people mentioned in the document.

    Return ONLY the raw JSON object matching the requested schema. Do not enclose it in markdown blocks (\`\`\`json). I will parse it directly.
    `;

    const result = await model.generateContent([filePart, prompt]);
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
