"use client";

import { useSession } from "next-auth/react";

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
import PostForm from "@/app/components/header/post-form";

import { BookOpenIcon } from "lucide-react";

const NewPost = () => {
  const { data: session } = useSession();

  return (
    <Drawer>
      <DrawerTrigger
        disabled={!session}
        className={cn(buttonVariants({ size: "icon" }))}
      >
        <BookOpenIcon />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Publicar novo projeto</DrawerTitle>
          <DrawerDescription>
            Compartilhe seu projeto com a comunidade
          </DrawerDescription>
        </DrawerHeader>

        <PostForm />
      </DrawerContent>
    </Drawer>
  );
};

export default NewPost;
