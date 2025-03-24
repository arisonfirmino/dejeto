import { db } from "@/app/lib/prisma";

export const getPosts = async () => {
  const posts = await db.post.findMany({
    include: {
      user: true,
      likes: true,
      comments: { include: { user: true }, orderBy: { created_at: "desc" } },
    },
    orderBy: { created_at: "desc" },
  });

  return posts;
};

export const getPost = async ({ id }: { id: string }) => {
  const post = await db.post.findUnique({
    where: { id },
    include: {
      user: true,
      likes: true,
      comments: { include: { user: true }, orderBy: { created_at: "desc" } },
    },
  });

  return post;
};
