import UserForm from "@/components/user-form";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authOptions);
  const user = await db.query.users.findFirst({
    where: eq(users.id, session?.user.id),
  });

  if (!user) {
    return notFound();
  }

  return (
    <div>
      <UserForm user={user} />
    </div>
  );
}
