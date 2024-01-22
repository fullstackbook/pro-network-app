// Function to calculate cosine similarity between two vectors
export function cosineSimilarity(vector1: number[], vector2: number[]): number {
  const dotProduct = vector1.reduce(
    (sum, value, index) => sum + value * vector2[index],
    0
  );
  const magnitude1 = Math.sqrt(
    vector1.reduce((sum, value) => sum + value ** 2, 0)
  );
  const magnitude2 = Math.sqrt(
    vector2.reduce((sum, value) => sum + value ** 2, 0)
  );

  if (magnitude1 === 0 || magnitude2 === 0) {
    return 0; // Avoid division by zero
  }

  return dotProduct / (magnitude1 * magnitude2);
}
