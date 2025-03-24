"use server";

import { db } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

interface CreateNewPostProps {
  data: {
    userId: string;
    title: string;
    description: string;
    image?: string;
    deploy: string;
    repo?: string;
  };
}

export const createNewPost = async ({ data }: CreateNewPostProps) => {
  if (!data.userId) return { error: "ID do usuário é obrigatório." };

  const user = await db.user.findUnique({
    where: { id: data.userId },
  });

  if (!user) return { error: "Usuário não encontrado." };

  if (!data.title) return { error: "O título do post é obrigatório." };
  if (!data.deploy)
    return { error: "O link de deploy do projeto é obrigatório." };

  await db.post.create({
    data: {
      userId: data.userId,
      title: data.title,
      description: data.description,
      image: data.image,
      deploy: data.deploy,
      repo: data.repo,
    },
  });

  revalidatePath("/");
};

interface DeletePostProps {
  userId: string;
  postId: string;
}

export const deletePost = async ({ userId, postId }: DeletePostProps) => {
  if (!userId || !postId) throw new Error("Usuário ou post inválido.");

  const [user, post] = await Promise.all([
    db.user.findUnique({ where: { id: userId } }),
    db.post.findUnique({ where: { id: postId }, include: { user: true } }),
  ]);

  if (!user) throw new Error("Usuário não encontrado.");
  if (!post) throw new Error("Post não encontrado.");

  if (userId !== post.user.id)
    throw new Error("Você não tem permissão para excluir este post.");

  await db.comment.deleteMany({
    where: { postId },
  });

  await db.like.deleteMany({
    where: { postId },
  });

  await db.post.delete({
    where: { id: postId },
  });

  revalidatePath("/");
};
