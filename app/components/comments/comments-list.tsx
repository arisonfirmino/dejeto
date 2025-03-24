import CommentItem from "@/app/components/comments/comemnt-item";

import { Prisma } from "@prisma/client";

interface CommentsListProps {
  comments: Prisma.CommentGetPayload<{
    include: { user: true };
  }>[];
}

const CommentsList = ({ comments }: CommentsListProps) => {
  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id}>
          <CommentItem comment={comment} />
        </li>
      ))}
    </ul>
  );
};

export default CommentsList;
