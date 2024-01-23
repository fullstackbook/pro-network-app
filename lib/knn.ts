import { eq, not } from "drizzle-orm";
import { db } from "./db";
import { users } from "./schema";
import { combinedSimilarity } from "./similarity";

export async function getKNearestNeighborsByUserId(userId: string, k: number) {
  // get user by user id
  const targetUser = await db.query.users.findFirst({
    with: { usersToUsersSkills: { with: { skill: true } } },
    where: eq(users.id, userId),
  });

  if (!targetUser) {
    throw new Error("user not found");
  }

  // get all other users
  const otherUsers = await db.query.users.findMany({
    with: { usersToUsersSkills: { with: { skill: true } } },
    where: not(eq(users.id, userId)),
  });

  // get all skills
  const allSkills = await db.query.skills.findMany();

  // create skill id -> index map
  const skillIdToIndexMap = new Map();
  allSkills.forEach((val, idx) => skillIdToIndexMap.set(val.id, idx));

  // create skill vector for target user
  const vector1 = new Array(allSkills.length).fill(0);
  targetUser?.usersToUsersSkills.forEach((uts) => {
    const idx = skillIdToIndexMap.get(uts.skillId);
    vector1[idx] = uts.rating;
  });

  // calculate the combined similarity of user to each other user
  const usersWithSimilarityScores = otherUsers.map((user) => {
    const vector2 = new Array(allSkills.length).fill(0);
    user.usersToUsersSkills.forEach((uts) => {
      const idx = skillIdToIndexMap.get(uts.skillId);
      vector2[idx] = uts.rating;
    });
    const combinedSimilarityScore = combinedSimilarity(
      vector1,
      vector2,
      targetUser.jobTitle,
      user.jobTitle
    );
    return {
      user: user,
      similarity: combinedSimilarityScore,
    };
  });

  // sort the combined similarity in desc order
  usersWithSimilarityScores.sort((a, b) => b.similarity - a.similarity);

  // get the top k users
  const topKUsersWithSimilarityScore = usersWithSimilarityScores.slice(0, k);

  return topKUsersWithSimilarityScore;
}
