import PostItem from "@/app/components/post/post-item";

import { Prisma } from "@prisma/client";

interface PostsListProps {
  posts: Prisma.PostGetPayload<{
    include: { user: true };
  }>[];
}

const PostsList = ({ posts }: PostsListProps) => {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <PostItem post={post} />
        </li>
      ))}
    </ul>
  );
};

export default PostsList;
