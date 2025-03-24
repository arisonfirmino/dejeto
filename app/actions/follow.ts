"use server";

import { db } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

interface ToggleFollowProps {
  followerId: string;
  followingId: string;
}

export const toggleFollow = async ({
  followerId,
  followingId,
}: ToggleFollowProps) => {
  if (!followerId || !followingId)
    throw new Error("IDs de seguidor e seguido são obrigatórios.");

  const [follower, following] = await Promise.all([
    db.user.findUnique({ where: { id: followerId } }),
    db.user.findUnique({ where: { id: followingId } }),
  ]);

  if (!follower) throw new Error("O usuário seguidor não foi encontrado.");
  if (!following)
    throw new Error("O usuário a ser seguido não foi encontrado.");

  if (followerId === followingId)
    throw new Error("Você não pode seguir a si mesmo.");

  const existingFollow = await db.follow.findFirst({
    where: {
      followerId,
      followingId,
    },
  });

  if (existingFollow) {
    await db.follow.delete({
      where: {
        id: existingFollow.id,
      },
    });
  } else {
    await db.follow.create({
      data: {
        followerId,
        followingId,
      },
    });
  }

  revalidatePath("/");
};
