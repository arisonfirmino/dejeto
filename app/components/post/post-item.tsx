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
import CommentForm from "@/app/components/post/comment-form";

import { DotIcon, ImageOffIcon } from "lucide-react";

import { formatDate } from "@/app/helpers/formatDate";

import { Prisma } from "@prisma/client";

interface PostItemProps {
  post: Prisma.PostGetPayload<{
    include: { user: true };
  }>;
}

const PostItem = ({ post }: PostItemProps) => {
  return (
    <Card className="border-border/15 border-b p-5">
      <CardHeader>
        <div className="flex gap-0.5">
          <Identity user={post.user} size="size-8" fontSize="text-xs" />
          <DotIcon size={16} className="text-muted-foreground" />
          <span className="text-muted-foreground text-xs">
            {formatDate(post.created_at)}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle className="line-clamp-1">{post.title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {post.description}
        </CardDescription>
        <PostLinks post={post} />
        {post.image ? (
          <PostImage />
        ) : (
          <div className="text-muted-foreground flex items-center justify-center gap-2 py-2.5 text-xs">
            <ImageOffIcon size={14} />
            <span>Este post não tem imagem.</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex-col">
        <div className="flex items-center gap-2.5">
          <LikeButton />
          <CommentForm />
        </div>

        <p className="line-clamp-2 text-xs">
          <span className="text-foreground font-medium">
            {post.user.username}
          </span>
          &nbsp; Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Pariatur molestiae officia molestias deleniti consequatur quos nobis
          amet, eligendi voluptatibus dolore natus tempore. Fuga deserunt esse
          facilis nemo. Voluptates, alias aperiam!
        </p>
      </CardFooter>
    </Card>
  );
};

export default PostItem;
