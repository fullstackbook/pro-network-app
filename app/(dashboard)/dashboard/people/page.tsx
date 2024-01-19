import { db } from "@/lib/db";

async function getUsers() {
  const data = await db.query.users.findMany();
  return data;
}

export default async function Page() {
  const res = await getUsers();

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
