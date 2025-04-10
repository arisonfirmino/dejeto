"use server";

import { db } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

interface AddCommentProps {
  userId: string;
  postId: string;
  text: string;
}

export const addComment = async ({ userId, postId, text }: AddCommentProps) => {
  if (!userId) throw new Error("ID do usuário não fornecido.");
  if (!postId) throw new Error("ID do post não fornecido.");
  if (!text) throw new Error("Texto do comentário não pode ser vazio.");

  const [user, post] = await Promise.all([
    db.user.findUnique({ where: { id: userId } }),
    db.post.findUnique({ where: { id: postId }, include: { user: true } }),
  ]);

  if (!user) throw new Error("Usuário não encontrado.");
  if (!post) throw new Error("Post não encontrado.");

  if (userId === post.user.id)
    throw new Error("Você não pode comentar no seu próprio post.");

  await db.comment.create({
    data: {
      userId,
      postId,
      text,
    },
  });

  revalidatePath("/");
};

export const deleteComment = async ({
  userId,
  commentId,
}: {
  userId: string;
  commentId: string;
}) => {
  if (!userId) throw new Error("ID do usuário não fornecido.");
  if (!commentId) throw new Error("ID do comentário não fornecido.");

  const [user, comment] = await Promise.all([
    db.user.findUnique({ where: { id: userId } }),
    db.comment.findUnique({
      where: { id: commentId },
      include: { user: true },
    }),
  ]);

  if (!user) throw new Error("Usuário não encontrado.");
  if (!comment) throw new Error("Comentário não encontrado.");

  if (userId !== comment.user.id)
    throw new Error("Você não tem permissão para excluir este comentário.");

  await db.comment.delete({
    where: { id: commentId },
  });

  revalidatePath("/");
};
