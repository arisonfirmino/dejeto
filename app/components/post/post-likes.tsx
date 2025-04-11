import { Prisma } from "@prisma/client";

interface PostLikesProps {
  likes: Prisma.LikeGetPayload<{
    include: { user: true };
  }>[];
}

const PostLikes = ({ likes }: PostLikesProps) => {
  return (
    <p className="text-foreground/50 text-xs">
      curtido por{" "}
      <span className="text-foreground font-medium">
        {likes[0].user.username}
      </span>{" "}
      {likes.length > 1 && (
        <>
          e {likes.length === 2 ? "outra" : "outras"}{" "}
          <span className="text-foreground font-medium">
            {likes.length - 1}
          </span>{" "}
          {likes.length === 2 ? "pessoa" : "pessoas"}
        </>
      )}
    </p>
  );
};

export default PostLikes;
