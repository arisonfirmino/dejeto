"use server";

import { db } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

interface ToggleLikeProps {
  userId: string;
  postId: string;
}

export const toggleLike = async ({ userId, postId }: ToggleLikeProps) => {
  if (!userId || !postId) throw new Error("Usuário ou post inválido.");

  const [user, post] = await Promise.all([
    db.user.findUnique({ where: { id: userId } }),
    db.post.findUnique({ where: { id: postId }, include: { user: true } }),
  ]);

  if (!user) throw new Error("Usuário não encontrado.");
  if (!post) throw new Error("Post não encontrado.");

  if (userId === post.user.id)
    throw new Error("Você não pode curtir seu próprio post.");

  const existingLike = await db.like.findFirst({
    where: {
      userId,
      postId,
    },
  });

  if (existingLike) {
    await db.like.delete({
      where: {
        id: existingLike.id,
      },
    });
  } else {
    await db.like.create({
      data: {
        userId,
        postId,
      },
    });
  }

  revalidatePath("/");
};
