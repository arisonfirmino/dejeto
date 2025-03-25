import { Button } from "@/app/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/app/components/ui/drawer";
import DeletePost from "@/app/components/post/menu/delete-post";

import { EllipsisIcon } from "lucide-react";

import { Post } from "@prisma/client";

interface PostMenuProps {
  post: Post;
}

const PostMenu = ({ post }: PostMenuProps) => {
  return (
    <Drawer>
      <DrawerTrigger>
        <EllipsisIcon size={14} />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Gerenciar publicação</DrawerTitle>
          <DrawerDescription>
            Escolha uma das opções abaixo para gerenciar este post.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DeletePost postId={post.id} />

          <DrawerClose>
            <Button variant="outline" className="w-full">
              Cancelar
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default PostMenu;
