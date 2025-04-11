"use server";

import { db } from "@/app/lib/prisma";

export const getPosts = async () => {
  const posts = await db.post.findMany({
    orderBy: {
      created_at: "desc",
    },
    include: {
      user: true,
      comments: {
        orderBy: {
          created_at: "desc",
        },
        include: {
          user: true,
        },
      },
      likes: {
        orderBy: {
          created_at: "desc",
        },
        include: {
          user: true,
        },
      },
    },
  });

  return posts;
};
