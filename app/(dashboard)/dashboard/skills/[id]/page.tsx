import SortSkillSelect from "@/components/sort-skill-select";
import { db } from "@/lib/db";
import { skills, users, usersToSkills } from "@/lib/schema";
import { Avatar } from "@mantine/core";
import { IconStar } from "@tabler/icons-react";
import { desc, eq } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getSkillById(id: string) {
  return await db.query.skills.findFirst({ where: eq(skills.id, id) });
}

async function getUsersBySkillId(id: string, sort: string) {
  const promise = db
    .select()
    .from(users)
    .leftJoin(usersToSkills, eq(users.id, usersToSkills.userId))
    .where(eq(usersToSkills.skillId, id));

  switch (sort) {
    case "name":
      promise.orderBy(users.name);
      break;
    case "-name":
      promise.orderBy(desc(users.name));
      break;
    case "rating":
      promise.orderBy(usersToSkills.rating);
      break;
    case "-rating":
      promise.orderBy(desc(usersToSkills.rating));
      break;
  }

  return await promise;
}

interface Props {
  params: { id: string };
  searchParams: { sort: string };
}

export default async function Page({ params, searchParams }: Props) {
  const { id } = params;
  const { sort } = searchParams;
  const skill = await getSkillById(id);
  const data = await getUsersBySkillId(id, sort);

  if (!skill) {
    return notFound();
  }

  return (
    <div className="flex flex-col gap-5 max-w-md">
      <h1 className="font-bold text-xl">Users with {skill.name} skill</h1>
      <SortSkillSelect value={sort} />
      <ul className="flex flex-col gap-0.5">
        {data.map((d) => (
          <li key={d.user.id}>
            <Link
              href={`/dashboard/people/${d.user.id}`}
              className="p-2 border-blue-400 border-b flex flex-row justify-between"
            >
              <div className="flex flex-row gap-2 items-center">
                <Avatar src={d.user.image} /> {d.user.name}
              </div>
              <div className="flex flex-row gap-2">
                {d.users_to_skills?.rating} <IconStar color="orange" />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
