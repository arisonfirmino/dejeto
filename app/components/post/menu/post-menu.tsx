import { cn } from "@/app/lib/utils";
import { buttonVariants } from "@/app/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/app/components/ui/drawer";
import DeletePost from "@/app/components/post/menu/delete-post";

import { EditIcon, EllipsisIcon } from "lucide-react";

import { Post } from "@prisma/client";
import Link from "next/link";

interface PostMenuProps {
  post: Pick<Post, "id">;
}

const PostMenu = ({ post }: PostMenuProps) => {
  return (
    <Drawer>
      <DrawerTrigger
        className={cn(buttonVariants({ size: "icon", variant: "ghost" }))}
      >
        <EllipsisIcon size={16} />
      </DrawerTrigger>
      <DrawerContent className="gap-2.5">
        <DrawerHeader>
          <DrawerTitle>Ações do post</DrawerTitle>
          <DrawerDescription>
            Escolha o que deseja fazer com este post.
          </DrawerDescription>
        </DrawerHeader>

        <div className="flex gap-2.5 px-2.5">
          <DeletePost postId={post.id} />
          <Link
            href={`/edit/${post.id}`}
            className={cn(
              buttonVariants({
                variant: "outline",
                className: "flex-1 justify-between",
              }),
            )}
          >
            Editar Post
            <EditIcon />
          </Link>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default PostMenu;
