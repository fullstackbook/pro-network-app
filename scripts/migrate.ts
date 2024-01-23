import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db } from "@/lib/db";

async function main() {
  await migrate(db, { migrationsFolder: "./drizzle " });
}

main();
