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
import Identity from "@/app/components/post/identity";
import PostsLinks from "@/app/components/post/posts-links";
import PostInteractions from "@/app/components/post/post-interactions";
import PostLikes from "@/app/components/post/post-likes";
import PostMenu from "@/app/components/post/menu/post-menu";

import { DotIcon } from "lucide-react";

import { formatDate } from "@/app/helpers/formatDate";

import { Prisma } from "@prisma/client";

interface PostItemProps {
  post: Prisma.PostGetPayload<{
    include: {
      user: true;
      comments: { include: { user: true } };
      likes: { include: { user: true } };
    };
  }>;
}

const PostItem = ({ post }: PostItemProps) => {
  const { data: session } = useSession();

  return (
    <Card className="border-border/30 gap-2.5 border-b bg-transparent py-5">
      <CardHeader className="flex items-center justify-between px-2.5">
        <Identity user={post.user} />
        {session && session.user.id === post.user.id ? (
          <PostMenu post={post} />
        ) : (
          ""
        )}
      </CardHeader>

      <CardContent className="space-y-1.5">
        <div className="flex items-center gap-1.5 px-2.5">
          <CardTitle>{post.title}</CardTitle>
          <DotIcon size={16} className="text-foreground/50" />
          <span className="text-foreground/50 text-xs">
            {formatDate(post.created_at)}
          </span>
        </div>

        <div className="bg-card aspect-square w-full" />
      </CardContent>

      <CardFooter className="gap-1.5 px-2.5">
        <div className="flex items-center justify-between">
          <PostInteractions post={post} />
          <PostsLinks post={post} />
        </div>

        {post.likes.length > 0 && <PostLikes likes={post.likes} />}

        <CardDescription className="line-clamp-2">
          <span className="text-foreground font-medium">
            {post.user.username}
          </span>
          &nbsp;&nbsp;{post.description}
        </CardDescription>
      </CardFooter>
    </Card>
  );
};

export default PostItem;
