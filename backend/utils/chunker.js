export const chunkText = (text, chunkSize = 1000, overlap = 200) => {
  if (!text || text.length === 0) return [];
  
  const chunks = [];
  let i = 0;
  
  while (i < text.length) {
    // Get the substring for the chunk
    let chunk = text.substring(i, i + chunkSize);
    
    // If this is not the first chunk, find the first space to avoid cutting words in half
    // unless there are no spaces (which is rare). Same for the end.
    // For simplicity, we just use substring, but to be slightly smarter, 
    // we can trim the chunks to nearest words.
    
    chunks.push(chunk);
    
    // Move forward by chunkSize - overlap
    i += (chunkSize - overlap);
  }
  
  return chunks;
};
