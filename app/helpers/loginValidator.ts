"use server";

import { db } from "@/app/lib/prisma";

interface LoginValidatorProps {
  identifier: string;
  password: string;
}

export const loginValidator = async ({
  identifier,
  password,
}: LoginValidatorProps) => {
  if (!identifier || !password)
    return { error: "Todos os campos são obrigatórios." };

  const user = await db.user.findFirst({
    where: {
      OR: [{ email: identifier }, { username: identifier }],
    },
  });

  if (!user) return { error: "Usuário não cadastrado.", type: "identifier" };

  if (user.password !== password)
    return { error: "Senha incorreta.", type: "password" };
};
