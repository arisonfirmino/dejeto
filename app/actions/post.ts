"use server";

import { db } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

interface CreatePostProps {
  userId: string;
  title: string;
  description: string;
  deploy?: string;
  repo?: string;
}

export const createPost = async ({
  userId,
  title,
  description,
  deploy,
  repo,
}: CreatePostProps) => {
  if (!userId) throw new Error("ID do usuário não fornecido.");

  const user = await db.user.findUnique({
    where: { id: userId },
  });

  if (!user) throw new Error("Usuário não encontrado.");

  if (!title || !description)
    throw new Error("Título e descrição são obrigatórios para criar um post.");

  await db.post.create({
    data: {
      userId,
      title,
      description,
      deploy,
      repo,
    },
  });

  revalidatePath("/");
};

export const deletePost = async ({
  userId,
  postId,
}: {
  userId: string;
  postId: string;
}) => {
  if (!userId || !postId)
    throw new Error("ID do usuário ou do post não foi fornecido.");

  const [user, post] = await Promise.all([
    db.user.findUnique({ where: { id: userId } }),
    db.post.findUnique({ where: { id: postId }, include: { user: true } }),
  ]);

  if (!user) throw new Error("Usuário não encontrado.");
  if (!post) throw new Error("Post não encontrado.");

  if (userId !== post.user.id)
    throw new Error("Você não tem permissão para excluir este post.");

  await db.post.delete({
    where: { id: postId },
  });

  revalidatePath("/");
};
