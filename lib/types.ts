import { skills, users } from "./schema";

export type NewUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type NewSkill = typeof skills.$inferInsert;
