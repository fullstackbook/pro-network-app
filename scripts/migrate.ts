import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db } from "@/lib/db";

export default async function main() {
  await migrate(db, { migrationsFolder: "./drizzle " });
}

if (require.main === module) {
  main();
}
