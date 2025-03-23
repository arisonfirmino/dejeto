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
