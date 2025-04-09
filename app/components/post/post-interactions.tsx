import LikeButton from "@/app/components/post/like-button";
import CommentButton from "@/app/components/post/comments/comment-button";
import ShareButton from "@/app/components/post/share-button";

import { Prisma } from "@prisma/client";

interface PostInteractionsProps {
  post: Prisma.PostGetPayload<{
    include: {
      user: true;
      comments: { include: { user: true } };
    };
  }>;
}

const PostInteractions = ({ post }: PostInteractionsProps) => {
  return (
    <div className="flex items-center gap-2.5">
      <LikeButton />
      <CommentButton post={post} />
      <ShareButton />
    </div>
  );
};

export default PostInteractions;
