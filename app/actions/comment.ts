"use server";

import { db } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

interface AddCommentProps {
  userId: string;
  postId: string;
  content: string;
}

export const addComment = async ({
  userId,
  postId,
  content,
}: AddCommentProps) => {
  if (!userId || !postId) throw new Error("Usuário ou post inválido.");

  const [user, post] = await Promise.all([
    db.user.findUnique({ where: { id: userId } }),
    db.post.findUnique({ where: { id: postId }, include: { user: true } }),
  ]);

  if (!user) throw new Error("Usuário não encontrado.");
  if (!post) throw new Error("Post não encontrado.");

  if (userId === post.user.id)
    throw new Error("Você não pode comentar no próprio post.");

  if (!content) throw new Error("O comentário não pode estar vazio.");

  await db.comment.create({
    data: {
      userId,
      postId,
      content,
    },
  });

  revalidatePath("/");
};
