import { users } from "./schema";

export type NewUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
