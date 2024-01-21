import { db } from "@/lib/db";
import { skills, users, usersToSkills } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

async function getSkillById(id: string) {
  return await db.query.skills.findFirst({ where: eq(skills.id, id) });
}

async function getUsersBySkillId(id: string) {
  return await db
    .select()
    .from(users)
    .leftJoin(usersToSkills, eq(users.id, usersToSkills.userId))
    .where(eq(usersToSkills.skillId, id));
}

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const skill = await getSkillById(id);
  const data = await getUsersBySkillId(id);

  if (!skill) {
    return notFound();
  }

  return (
    <div>
      <h1>Users with {skill.name} skill</h1>
      <ul>
        {data.map((d) => (
          <li key={d.user.id}>
            {d.user.name} {d.users_to_skills?.rating}
          </li>
        ))}
      </ul>
    </div>
  );
}
