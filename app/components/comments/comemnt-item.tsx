"use client";

import { useSession } from "next-auth/react";

import { Card, CardDescription, CardHeader } from "@/app/components/ui/card";
import Identity from "@/app/components/ui/identity";
import DeleteComment from "@/app/components/comments/delete-comment";

import { DotIcon } from "lucide-react";

import { formatDate } from "@/app/helpers/formatDate";

import { Prisma } from "@prisma/client";

interface CommentItemProps {
  comment: Prisma.CommentGetPayload<{
    include: { user: true };
  }>;
}

const CommentItem = ({ comment }: CommentItemProps) => {
  const { data: session } = useSession();

  return (
    <Card className="border-border/15 border-b p-5">
      <CardHeader className="flex justify-between">
        <div className="flex gap-0.5">
          <Identity user={comment.user} size="size-8" fontSize="text-xs" />
          <DotIcon size={16} className="text-muted-foreground" />
          <span className="text-muted-foreground text-xs">
            {formatDate(comment.created_at)}
          </span>
        </div>

        {session && session.user.id === comment.user.id && (
          <DeleteComment userId={session.user.id} commentId={comment.id} />
        )}
      </CardHeader>

      <CardDescription className="text-foreground">
        {comment.content}
      </CardDescription>
    </Card>
  );
};

export default CommentItem;
