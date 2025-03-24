"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import Identity from "@/app/components/ui/identity";
import FollowButton from "@/app/components/ui/follow-button";
import PostMenu from "@/app/components/post/menu/post-menu";
import PostLinks from "@/app/components/post/post-links";
import PostImage from "@/app/components/post/post-image";
import LikeButton from "@/app/components/post/like-button";
import LikeCount from "@/app/components/post/like-count";
import CommentForm from "@/app/components/post/comment-form";
import PostComments from "@/app/components/post/post-comments";

import { DotIcon, ImageOffIcon } from "lucide-react";

import { formatDate } from "@/app/helpers/formatDate";

import { Prisma } from "@prisma/client";

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
  const pathname = usePathname();

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
            <PostMenu post={post} />
          ) : (
            <FollowButton followingId={post.user.id} />
          ))}
      </CardHeader>
      <CardContent>
        <CardTitle className="line-clamp-1">{post.title}</CardTitle>
        <CardDescription
          className={pathname === `/post/${post.id}` ? "" : "line-clamp-2"}
        >
          {pathname === `/post/${post.id}` ? (
            post.description
          ) : (
            <Link href={`/post/${post.id}`}>{post.description}</Link>
          )}
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

        {pathname === `/post/${post.id}` ? null : (
          <PostComments comments={post.comments} />
        )}
      </CardFooter>
    </Card>
  );
};

export default PostItem;
