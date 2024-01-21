import UsersTable from "@/components/users-table";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { ilike, or, sql } from "drizzle-orm";

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

async function fuzzySearch(query: string) {
  const res = await db
    .select()
    .from(users)
    .where(
      or(
        sql`similarity(name, ${query}) > 0.2`,
        sql`similarity(first_name, ${query}) > 0.2`,
        sql`similarity(last_name, ${query}) > 0.2`,
        sql`similarity(job_title, ${query}) > 0.2`
      )
    );
  return res;
}

export default async function Page({ searchParams }: Props) {
  const { query } = searchParams;
  // const users = await getUsers(query);
  const users = await fuzzySearch(query);

  return (
    <div>
      <UsersTable users={users} />
    </div>
  );
}
