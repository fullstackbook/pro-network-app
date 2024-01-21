import { skills, users, usersToSkills } from "./schema";

export type NewUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type NewSkill = typeof skills.$inferInsert;
export type NewUserToSkill = typeof usersToSkills.$inferInsert;
