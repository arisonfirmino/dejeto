import { cn } from "@/app/lib/utils";
import { buttonVariants } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import DeletePost from "@/app/components/post/menu/delete-post";

import { EllipsisIcon } from "lucide-react";

import { Post } from "@prisma/client";

interface PostMenuProps {
  post: Post;
}

const PostMenu = ({ post }: PostMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(buttonVariants({ size: "icon", variant: "ghost" }))}
      >
        <EllipsisIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom">
        <DropdownMenuItem asChild>
          <DeletePost postId={post.id} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PostMenu;
