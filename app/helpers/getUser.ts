"use server";

import { db } from "@/app/lib/prisma";

export const getUser = async ({ id }: { id: string }) => {
  const user = await db.user.findUnique({
    where: { id },
    include: {
      followers: true,
      following: true,
    },
  });

  return user;
};
