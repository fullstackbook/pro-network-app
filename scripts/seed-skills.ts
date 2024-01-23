import { db, pool } from "@/lib/db";
import { skills } from "@/lib/schema";
import { NewSkill } from "@/lib/types";

const data = [
  "Next.js",
  "React",
  "PostgreSQL",
  "TailwindCSS",
  "Mantine",
  "Vercel",
];

export default async function main() {
  for (let skill of data) {
    const newSkill: NewSkill = {
      id: crypto.randomUUID(),
      name: skill,
    };
    await db.insert(skills).values(newSkill).onConflictDoNothing();
  }
}

if (require.main === module) {
  main();
  pool.end();
}
