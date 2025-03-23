"use server";

import { db } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

interface ToggleLikeProps {
  likerId: string;
  likedId: string;
  postId: string;
}

export const toggleLike = async ({
  likerId,
  likedId,
  postId,
}: ToggleLikeProps) => {
  if (!likerId || !likedId || !postId) throw new Error("");

  const [liker, liked, post] = await Promise.all([
    db.user.findUnique({ where: { id: likerId } }),
    db.user.findUnique({ where: { id: likedId } }),
    db.post.findUnique({ where: { id: postId } }),
  ]);

  if (!liker) throw new Error("Usuário que deu like não encontrado.");
  if (!liked) throw new Error("Usuário que recebeu o like não encontrado.");
  if (!post) throw new Error("Post não encontrado.");

  if (likerId === likedId)
    throw new Error("Você não pode curtir seu próprio post.");

  const existingLike = await db.like.findFirst({
    where: {
      likerId,
      likedId,
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
        postId,
        likerId,
        likedId,
      },
    });
  }

  revalidatePath("/");
};
