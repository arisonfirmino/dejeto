import LikeButton from "@/app/components/post/like-button";
import CommentButton from "@/app/components/post/comment-button";
import ShareButton from "@/app/components/post/share-button";

const PostInteractions = () => {
  return (
    <div className="flex items-center gap-2.5">
      <LikeButton />
      <CommentButton />
      <ShareButton />
    </div>
  );
};

export default PostInteractions;
