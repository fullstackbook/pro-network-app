import UserCard from "@/components/user-card";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

async function getUserById(id: string) {
  return await db.query.users.findFirst({
    where: eq(users.id, id),
    with: { usersToUsersSkills: { with: { skill: true } } },
  });
}

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const user = await getUserById(id);

  if (!user) {
    notFound();
  }

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  return (
    <div>
      <div>
        <UserCard user={user} />
      </div>
    </div>
  );
}
