"use server";

import { db } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

interface CreatePostProps {
  userId: string;
  title: string;
  description: string;
  deploy?: string;
  repo?: string;
}

export const createPost = async ({
  userId,
  title,
  description,
  deploy,
  repo,
}: CreatePostProps) => {
  if (!userId) throw new Error("");

  const user = await db.user.findUnique({
    where: { id: userId },
  });

  if (!user) throw new Error("");

  if (!title || !description) throw new Error("");

  await db.post.create({
    data: {
      userId,
      title,
      description,
      deploy,
      repo,
    },
  });

  revalidatePath("/");
};
