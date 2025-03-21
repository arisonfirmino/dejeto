import { Button } from "@/app/components/ui/button";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/app/components/ui/dialog";
import PostForm from "@/app/components/ui/post-form";

import { BookOpenIcon } from "lucide-react";

import { Session } from "next-auth";

const NewPost = ({ session }: { session: Session | null }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={!session} size="icon">
          <BookOpenIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>O que você está criando?</DialogTitle>
          <DialogDescription>
            Conte para a comunidade sobre seu projeto! Preencha os detalhes e
            publique seu post.
          </DialogDescription>
        </DialogHeader>
        <PostForm />
      </DialogContent>
    </Dialog>
  );
};

export default NewPost;
