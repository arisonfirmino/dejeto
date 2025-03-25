"use client";

import { useState } from "react";

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

import { deleteComment } from "@/app/actions/comment";

const DeleteComment = ({
  userId,
  commentId,
}: {
  userId: string;
  commentId: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);

    await deleteComment({ userId, commentId });

    setIsLoading(false);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="text-primary">
        {isLoading ? (
          <LoaderCircleIcon size={12} className="animate-spin" />
        ) : (
          <Trash2Icon size={12} />
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir comentário</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza de que deseja excluir este comentário? Essa ação não
            pode ser desfeita.
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

export default DeleteComment;
