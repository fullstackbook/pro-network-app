import { db } from "@/lib/db";

const PER_PAGE = 20;

async function getUsers(page: number) {
  const offset = PER_PAGE * (page - 1);
  const data = await db.query.users.findMany({
    limit: PER_PAGE,
    offset: offset,
  });
  return data;
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
      {res.map((user) => (
        <div key={user.id}>
          {user.name} - {user.jobTitle}
        </div>
      ))}
    </div>
  );
}
