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
