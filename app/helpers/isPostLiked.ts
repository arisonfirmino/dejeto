"use server";

import { db } from "@/app/lib/prisma";

export const isPostLiked = async ({
  likerId,
  likedId,
  postId,
}: {
  likerId: string;
  likedId: string;
  postId: string;
}) => {
  if (!likerId || !likedId || !postId) return false;

  const existingLike = await db.like.findFirst({
    where: {
      likerId,
      likedId,
      postId,
    },
  });

  if (existingLike) {
    return true;
  } else {
    return false;
  }
};
