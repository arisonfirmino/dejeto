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
  if (!data) return { error: "Todos os campos são obrigatórios." };

  const [isUsernameAvailable, isEmailAvailable] = await Promise.all([
    db.user.findUnique({ where: { username: data.username } }),
    db.user.findUnique({ where: { email: data.email } }),
  ]);

  if (isUsernameAvailable)
    return {
      error: "O nome de usuário já está sendo usado, tente outro.",
      type: "username",
    };
  if (isEmailAvailable)
    return {
      error: "Este e-mail já está sendo usado, tente outro.",
      type: "email",
    };

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
