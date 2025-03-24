"use server";

import { db } from "@/app/lib/prisma";

export const isUserFollowing = async ({
  followerId,
  followingId,
}: {
  followerId: string;
  followingId: string;
}) => {
  if (!followerId || !followingId) return false;

  const existingFollow = await db.follow.findFirst({
    where: {
      followerId,
      followingId,
    },
  });

  if (existingFollow) {
    return true;
  } else {
    return false;
  }
};
