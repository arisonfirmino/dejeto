import { db } from "@/app/lib/prisma";

export const getPosts = async () => {
  const posts = await db.post.findMany({
    include: { user: true, likes: { include: { liker: true } } },
    orderBy: { created_at: "desc" },
  });

  return posts;
};
