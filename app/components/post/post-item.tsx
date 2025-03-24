"use client";

import { useSession } from "next-auth/react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import Identity from "@/app/components/ui/identity";
import PostLinks from "@/app/components/post/post-links";
import PostImage from "@/app/components/post/post-image";
import LikeButton from "@/app/components/post/like-button";
import LikeCount from "@/app/components/post/like-count";
import CommentForm from "@/app/components/post/comment-form";
import PostComments from "@/app/components/post/post-comments";

import { DotIcon, ImageOffIcon } from "lucide-react";

import { formatDate } from "@/app/helpers/formatDate";

import { Prisma } from "@prisma/client";
import FollowButton from "../ui/follow-button";

interface PostItemProps {
  post: Prisma.PostGetPayload<{
    include: {
      user: true;
      likes: true;
      comments: { include: { user: true } };
    };
  }>;
}

const PostItem = ({ post }: PostItemProps) => {
  const { data: session } = useSession();

  return (
    <Card className="border-border/15 border-b p-5">
      <CardHeader className="flex items-center justify-between">
        <div className="flex gap-0.5">
          <Identity user={post.user} size="size-8" fontSize="text-xs" />
          <DotIcon size={16} className="text-muted-foreground" />
          <span className="text-muted-foreground text-xs">
            {formatDate(post.created_at)}
          </span>
        </div>

        {session &&
          (session.user.id === post.user.id ? (
            ""
          ) : (
            <FollowButton followingId={post.user.id} />
          ))}
      </CardHeader>
      <CardContent>
        <CardTitle className="line-clamp-1">{post.title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {post.description}
        </CardDescription>
        <PostLinks post={post} />
        {post.image ? (
          <PostImage image={post.image} />
        ) : (
          <div className="text-muted-foreground flex items-center justify-center gap-2 py-2.5 text-xs">
            <ImageOffIcon size={14} />
            <span>Este post não tem imagem.</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex-col">
        {!session ? (
          <LikeCount count={post.likes.length} />
        ) : session.user.id === post.user.id ? (
          <LikeCount count={post.likes.length} />
        ) : (
          <div className="flex items-center gap-2.5">
            <LikeButton post={post} />
            <CommentForm postId={post.id} />
          </div>
        )}

        <PostComments comments={post.comments} />
      </CardFooter>
    </Card>
  );
};

export default PostItem;
