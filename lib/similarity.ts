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

// Function to calculate similarity based on skills and job title
export function combinedSimilarity(
  user1Skills: number[],
  user2Skills: number[],
  jobTitle1?: string | null,
  jobTitle2?: string | null
): number {
  const skillsSimilarity = cosineSimilarity(user1Skills, user2Skills);

  // additional criteria for job title
  const jobTitleSimilarity = jobTitle1 === jobTitle2 ? 1 : 0;

  // adjust weights
  const combinedSimilarity = 0.8 * skillsSimilarity + 0.2 * jobTitleSimilarity;

  return combinedSimilarity;
}
