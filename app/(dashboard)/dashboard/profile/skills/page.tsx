import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { usersToSkills } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";

async function getUsersToSkillsByUserId(userId: string) {
  return await db.query.usersToSkills.findMany({
    with: { skill: true },
    where: eq(usersToSkills.userId, userId),
  });
}

export default async function Page() {
  const session = await getServerSession(authOptions);
  const usersToSkills = await getUsersToSkillsByUserId(session?.user.id);

  console.log(usersToSkills);

  return (
    <div>
      <h1>Manage Skills</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rating</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {usersToSkills.map((userToSkill) => (
            <tr key={userToSkill.skill.id}>
              <td>{userToSkill.skill.name}</td>
              <td>{userToSkill.rating}</td>
              <td>DELETE</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
