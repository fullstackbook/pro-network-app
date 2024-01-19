import { db } from "@/lib/db";

async function getUsers(page: number) {
  const data = await db.query.users.findMany();
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
        <div>
          {user.name} - {user.jobTitle}
        </div>
      ))}
    </div>
  );
}
