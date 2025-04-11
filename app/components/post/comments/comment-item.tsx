"use client";

import { useSession } from "next-auth/react";

import UserDrawer from "@/app/components/user-drawer";
import DeleteComment from "@/app/components//post/comments/delete-comment";

import { DotIcon } from "lucide-react";

import { formatDate } from "@/app/helpers/formatDate";

import { Prisma } from "@prisma/client";

interface CommentItemProps {
  comment: Prisma.CommentGetPayload<{
    include: {
      user: true;
    };
  }>;
}

const CommentItem = ({ comment }: CommentItemProps) => {
  const { data: session } = useSession();

  return (
    <div className="border-border/30 relative flex items-start gap-2.5 space-y-1.5 border-b px-2.5 py-2.5">
      <UserDrawer user={comment.user} />
      <div className="text-foreground space-y-0.5 text-xs">
        <div className="flex items-center gap-1">
          <p className="font-medium">@{comment.user.username}</p>
          <DotIcon size={16} className="text-foreground/50" />
          <p className="text-foreground/50">{formatDate(comment.created_at)}</p>
        </div>
        <p>{comment.text}</p>
      </div>

      {session && session.user.id === comment.user.id && (
        <DeleteComment commentId={comment.id} />
      )}
    </div>
  );
};

export default CommentItem;
