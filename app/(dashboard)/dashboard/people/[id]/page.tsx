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
    <div className="flex flex-row gap-5">
      <div>
        <UserCard user={user} />
      </div>
      <div>
        <h2 className="font-bold text-xl">Bio</h2>
        <div
          className="prose dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: user.bio ?? "" }}
        />
      </div>
    </div>
  );
}
