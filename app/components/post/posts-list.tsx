import PostItem from "@/app/components/post/post-item";

import { User } from "@prisma/client";

interface PostsListProps {
  user: User;
}

const PostsList = ({ user }: PostsListProps) => {
  return (
    <ul>
      <li>
        <PostItem user={user} />
      </li>
    </ul>
  );
};

export default PostsList;
