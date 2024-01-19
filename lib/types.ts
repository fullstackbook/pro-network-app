import { users } from "./schema";

export type NewUser = typeof users.$inferInsert;
