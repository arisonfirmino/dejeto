"use server";

import { db } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

interface CreateAccountProps {
  data: {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
  };
}

export const createAccount = async ({ data }: CreateAccountProps) => {
  if (!data)
    return { type: "validation", error: "Todos os campos são obrigatórios." };

  const [usernameExists, emailExists] = await Promise.all([
    db.user.findUnique({ where: { username: data.username } }),
    db.user.findUnique({ where: { email: data.email } }),
  ]);

  if (usernameExists)
    return {
      type: "username",
      error: "Este nome de usuário já em uso, tente outro.",
    };
  if (emailExists)
    return { type: "email", error: "Este email já em uso, tente outro." };

  await db.user.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      email: data.email,
      password: data.password,
    },
  });

  revalidatePath("/");
};
