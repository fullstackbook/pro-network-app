import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { ilike, or } from "drizzle-orm";

interface Props {
  searchParams: { query: string };
}

async function getUsers(query: string) {
  const q = "%" + query + "%";
  const res = await db.query.users.findMany({
    where: or(
      ilike(users.name, q),
      ilike(users.jobTitle, q),
      ilike(users.firstName, q),
      ilike(users.lastName, q)
    ),
  });
  return res;
}

export default async function Page({ searchParams }: Props) {
  const { query } = searchParams;
  const users = await getUsers(query);

  return (
    <div>
      {users.map((user) => (
        <div>
          {user.name} - {user.firstName} {user.lastName}
        </div>
      ))}
    </div>
  );
}
