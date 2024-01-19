import PaginationContainer from "@/components/pagination-container";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { count } from "drizzle-orm";

const PER_PAGE = 20;

async function getUsers(page: number) {
  const countRes = await db.select({ value: count() }).from(users);
  const offset = PER_PAGE * (page - 1);
  const data = await db.query.users.findMany({
    limit: PER_PAGE,
    offset: offset,
  });
  const userCount = countRes[0].value;
  const numPages = Math.ceil(userCount / PER_PAGE);
  return {
    data: data,
    count: userCount,
    numPages: numPages,
  };
}

interface Props {
  searchParams: { page: number };
}

export default async function Page({ searchParams }: Props) {
  const page = searchParams.page || 1;
  console.log(page);

  const res = await getUsers(page);

  return (
    <div>
      {res.data.map((user) => (
        <div key={user.id}>
          {user.name} - {user.jobTitle}
        </div>
      ))}
      <PaginationContainer total={res.count} />
    </div>
  );
}
