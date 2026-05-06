/**
 * Calculates the cosine similarity between two vectors.
 * @param {number[]} vecA 
 * @param {number[]} vecB 
 * @returns {number} The cosine similarity score (between -1 and 1)
 */
export const cosineSimilarity = (vecA, vecB) => {
  if (vecA.length !== vecB.length) {
    throw new Error('Vectors must be of the same length');
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }

  if (normA === 0 || normB === 0) return 0;

  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
};

/**
 * Finds the top K most similar chunks to a query embedding.
 * @param {number[]} queryEmbedding 
 * @param {Array<{text: string, embedding: number[]}>} chunks 
 * @param {number} topK 
 * @returns {Array<{text: string, score: number}>} Top K chunks sorted by score
 */
export const findTopKSimilar = (queryEmbedding, chunks, topK = 3) => {
  // Calculate similarity for all chunks
  const scoredChunks = chunks.map(chunk => {
    return {
      text: chunk.text,
      score: cosineSimilarity(queryEmbedding, chunk.embedding)
    };
  });

  // Sort descending by score
  scoredChunks.sort((a, b) => b.score - a.score);

  // Return top K
  return scoredChunks.slice(0, topK);
};
