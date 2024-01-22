"use server";

import { z } from "zod";
import { authOptions } from "./auth";
import { getServerSession } from "next-auth";
import { db } from "./db";
import { users, usersToSkills } from "./schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

const UpdateUserSchema = z.object({
  jobTitle: z.string().min(3),
  bio: z.string(),
});

export interface UpdateUserState {
  errors?: {
    jobTitle?: string[];
    bio?: string[];
  };
  message?: string;
  success?: string;
}

export async function updateUser(
  prevState: UpdateUserState,
  formData: FormData
): Promise<UpdateUserState> {
  const session = await getServerSession(authOptions);
  const jobTitle = formData.get("jobTitle");
  const bio = formData.get("bio");

  const validatedFields = UpdateUserSchema.safeParse({
    jobTitle: jobTitle,
    bio: bio,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Update user error",
    };
  }

  await db
    .update(users)
    .set({
      jobTitle: validatedFields.data.jobTitle,
      bio: validatedFields.data.bio,
    })
    .where(eq(users.id, session?.user.id));

  return {
    success: "Update user success",
  };
}

const UpdateSkillRatingSchema = z.object({
  skillId: z.string().uuid(),
  rating: z.number().min(1).max(5),
});

interface UpdateSkillRatingState {
  errors?: {
    skillId?: string[];
    rating?: string[];
  };
  message?: string;
  success?: string;
}

export async function updateSkillRating(
  prevState: UpdateSkillRatingState,
  formData: FormData
): Promise<UpdateSkillRatingState> {
  const session = await getServerSession(authOptions);

  const validatedFields = UpdateSkillRatingSchema.safeParse({
    skillId: formData.get("skillId"),
    rating: parseInt(formData.get("rating")?.toString()!),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Update skill error",
    };
  }

  await db
    .update(usersToSkills)
    .set({ rating: validatedFields.data.rating })
    .where(
      and(
        eq(usersToSkills.skillId, validatedFields.data.skillId),
        eq(usersToSkills.userId, session?.user.id)
      )
    );

  revalidatePath("/dashboard/profile/skills");

  return {
    success: "Update skill success",
  };
}
