"use server";

import { db } from "@/app/lib/prisma";

export const authenticateUser = async ({
  identifier,
  password,
}: {
  identifier: string;
  password: string;
}) => {
  if (!identifier || !password)
    return { type: "validation", error: "Todos os campos são obrigatórios." };

  const user = await db.user.findFirst({
    where: {
      OR: [{ email: identifier }, { username: identifier }],
    },
  });

  if (!user) return { type: "identifier", error: "Usuário não encontrado." };

  if (user.password !== password)
    return { type: "password", error: "Senha incorreta" };
};
