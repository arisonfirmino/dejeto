"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/components/ui/alert-dialog";

import { LoaderCircleIcon, Trash2Icon } from "lucide-react";

import { deletePost } from "@/app/actions/post";

const DeletePost = ({ postId }: { postId: string }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();

  const handleDelete = async () => {
    if (!session) return;

    setIsLoading(true);

    await deletePost({ userId: session.user.id, postId });

    setIsLoading(false);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger disabled={isLoading} asChild>
        <button
          disabled={isLoading}
          className="text-muted-foreground hover:text-foreground flex w-full cursor-pointer items-center justify-between rounded p-1 text-xs hover:bg-gray-100"
        >
          {isLoading ? "Excluindo" : "Excluir"}
          {isLoading ? (
            <LoaderCircleIcon size={12} className="animate-spin" />
          ) : (
            <Trash2Icon size={12} />
          )}
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir post</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza de que deseja excluir este post? Essa ação não pode ser
            desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeletePost;
