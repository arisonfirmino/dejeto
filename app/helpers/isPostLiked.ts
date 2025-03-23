"use server";

import { db } from "@/app/lib/prisma";

export const isPostLiked = async ({
  userId,
  postId,
}: {
  userId: string;
  postId: string;
}) => {
  if (!userId || !postId) return false;

  const existingLike = await db.like.findFirst({
    where: {
      userId,
      postId,
    },
  });

  if (existingLike) {
    return true;
  } else {
    return false;
  }
};
