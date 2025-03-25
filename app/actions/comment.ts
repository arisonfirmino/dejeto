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

interface DeleteCommentProps {
  userId: string;
  commentId: string;
}

export const deleteComment = async ({
  userId,
  commentId,
}: DeleteCommentProps) => {
  if (!userId || !commentId) throw new Error("Usuário ou comentário inválido.");

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
    throw new Error("Você não tem permissão para excluir esse comentário.");

  await db.comment.delete({
    where: { id: commentId },
  });

  revalidatePath("/");
};
