import fs from 'fs/promises';
// We need to import the worker to avoid errors in the Node.js environment
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import 'pdfjs-dist/legacy/build/pdf.worker.mjs';


export const extractText = async (filePath) => {
  try {
    // 1. Read the file into a standard Node.js Buffer object.
    const dataBuffer = await fs.readFile(filePath);

    // 2. **THE FIX**: Convert the Buffer into a Uint8Array, which is the
    //    format the pdfjs-dist library requires.
    const uint8Array = new Uint8Array(dataBuffer);

    // 3. Pass the correctly formatted data to the library.
    const loadingTask = pdfjsLib.getDocument(uint8Array);
    const pdf = await loadingTask.promise;

    let fullText = '';

    // 4. Iterate through each page of the PDF to extract its text.
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      // Join the text items of the page into a single string.
      const pageText = textContent.items.map((item) => item.str).join(' ');
      fullText += pageText + '\n'; // Add a newline for readability between pages.
    }

    return fullText;
  } catch (error) {
    // Log the detailed error for debugging and throw a generic one.
    console.error('Error extracting text from PDF:', error);
    throw new Error('Failed to extract text from PDF.');
  }
};
