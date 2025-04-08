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

import { DotIcon } from "lucide-react";

import { User } from "@prisma/client";

interface PostItemProps {
  user: User;
}

const PostItem = ({ user }: PostItemProps) => {
  return (
    <Card className="border-border/30 gap-2.5 border-b bg-transparent py-5">
      <CardHeader className="px-2.5">
        <Identity user={user} />
      </CardHeader>

      <CardContent className="space-y-1.5">
        <div className="flex items-center gap-1.5 px-2.5">
          <CardTitle>Nome do projeto</CardTitle>
          <DotIcon size={16} className="text-foreground/50" />
          <span className="text-foreground/50 text-xs">20 mar 2025</span>
        </div>

        <div className="bg-card aspect-square w-full" />
      </CardContent>

      <CardFooter className="gap-1.5 px-2.5">
        <div className="flex items-center justify-between">
          <PostInteractions />
          <PostsLinks />
        </div>

        <p className="text-foreground/50 text-xs">
          curtido por{" "}
          <span className="text-foreground font-medium">{user.username}</span> e
          mais <span className="text-foreground font-medium">63</span> pessoas
        </p>

        <CardDescription className="line-clamp-2">
          <span className="text-foreground font-medium">{user.username}</span>
          &nbsp;&nbsp;Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Eum aliquid ipsa dignissimos! Perspiciatis quas nobis, quisquam ea
          quasi eligendi, aliquam sint voluptas esse, nihil sit consequuntur
          enim odit illo perferendis.
        </CardDescription>
      </CardFooter>
    </Card>
  );
};

export default PostItem;
