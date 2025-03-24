import { getPost } from "@/app/helpers/getPosts";
import { redirect } from "next/navigation";

import PostItem from "@/app/components/post/post-item";
import CommentsList from "@/app/components/comments/comments-list";

const PostPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = await params;

  const post = await getPost({ id: resolvedParams.id });

  if (!post) redirect("/");

  return (
    <>
      <PostItem post={post} />

      <div className="mt-2.5 ml-2.5 w-fit border-b px-2 pb-1">
        <p className="text-sm font-medium">
          Comentários&nbsp;&nbsp;
          <span className="text-muted-foreground font-normal">
            (&nbsp;{post.comments.length}&nbsp;)
          </span>
        </p>
      </div>

      <CommentsList comments={post.comments} />
    </>
  );
};

export default PostPage;
