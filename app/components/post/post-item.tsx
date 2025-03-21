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

import { DotIcon } from "lucide-react";

const PostItem = () => {
  const user = {
    firstName: "Arison",
    lastName: "Firmino",
    username: "arisonfirmino",
    avatar: null,
  };

  return (
    <Card className="px-5">
      <CardHeader>
        <div className="flex gap-0.5">
          <Identity user={user} size="size-8" fontSize="text-xs" />
          <DotIcon size={16} className="text-muted-foreground" />
          <span className="text-muted-foreground text-xs">21 mar, 2025</span>
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle className="line-clamp-1">Untitled</CardTitle>
        <CardDescription className="line-clamp-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum illo
          voluptas architecto, sunt ab, quis quod voluptatibus fugit aliquid
          tempore nobis unde ad! Ut debitis mollitia porro minus assumenda
          quasi.
        </CardDescription>
        <PostLinks />
        <PostImage />
      </CardContent>
      <CardFooter className="flex-col">
        <div className="flex items-center gap-2.5">
          <LikeButton />
          <CommentForm />
        </div>

        <p className="line-clamp-2 text-xs">
          <span className="text-foreground font-medium">{user.username}</span>
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
