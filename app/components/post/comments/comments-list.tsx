import CommentItem from "@/app/components/post/comments/comment-item";

import { Prisma } from "@prisma/client";

interface CommentsListProps {
  comments: Prisma.CommentGetPayload<{
    include: {
      user: true;
    };
  }>[];
}

const CommentsList = ({ comments }: CommentsListProps) => {
  return (
    <ul className="h-96 overflow-y-auto">
      {comments.map((comment) => (
        <li key={comment.id}>
          <CommentItem comment={comment} />
        </li>
      ))}
    </ul>
  );
};

export default CommentsList;
