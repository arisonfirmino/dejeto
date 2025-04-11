"use server";

import { db } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export const toggleLike = async ({
  userId,
  postId,
}: {
  userId: string;
  postId: string;
}) => {
  if (!userId) throw new Error("ID do usuário não fornecido.");
  if (!postId) throw new Error("ID do post não fornecido.");

  const [user, post] = await Promise.all([
    db.user.findUnique({ where: { id: userId } }),
    db.post.findUnique({ where: { id: postId }, include: { user: true } }),
  ]);

  if (!user) throw new Error("Usuário não encontrado.");
  if (!post) throw new Error("Post não encontrado.");

  if (userId === post.user.id)
    throw new Error("Você não pode curtir o seu próprio post.");

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
