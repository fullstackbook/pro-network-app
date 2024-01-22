import AddUserToSkillBtn from "@/components/add-user-to-skill-btn";
import DeleteUserToSkillBtn from "@/components/delete-user-to-skill-btn";
import { SkillRatingForm } from "@/components/skill-rating-form";
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

async function getAllSkills() {
  return await db.query.skills.findMany();
}

export default async function Page() {
  const session = await getServerSession(authOptions);
  const usersToSkills = await getUsersToSkillsByUserId(session?.user.id);
  const allSkills = await getAllSkills();

  console.log(usersToSkills);

  return (
    <div className="flex flex-col gap-5 max-w-xl">
      <h1 className="font-bold text-xl">Manage Skills</h1>
      <table className="border-collapse border-0">
        <thead>
          <tr>
            <th className="border-slate-600 p-2 border-b text-left">Name</th>
            <th className="border-slate-600 p-2 border-b text-left">Rating</th>
            <th className="border-slate-600 p-2 border-b text-left">Delete</th>
          </tr>
        </thead>
        <tbody>
          {usersToSkills.map((userToSkill) => (
            <tr key={userToSkill.skill.id}>
              <td className="border-slate-600 p-2 border-t">
                {userToSkill.skill.name}
              </td>
              <td className="border-slate-600 p-2 border-t">
                <SkillRatingForm
                  rating={userToSkill.rating || 0}
                  skillId={userToSkill.skillId}
                />
              </td>
              <td className="border-slate-600 p-2 border-t">
                <DeleteUserToSkillBtn skillId={userToSkill.skillId} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <AddUserToSkillBtn allSkills={allSkills} />
      </div>
    </div>
  );
}
