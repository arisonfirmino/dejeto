"use client";

import { useSession } from "next-auth/react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import CommentsList from "@/app/components/post/comments/comments-list";
import CommentForm from "@/app/components/post/comments/comment-form";

import { MessageCircleIcon } from "lucide-react";

import { Prisma } from "@prisma/client";

interface CommentButtonProps {
  post: Prisma.PostGetPayload<{
    include: {
      user: true;
      comments: {
        include: {
          user: true;
        };
      };
    };
  }>;
}

const CommentButton = ({ post }: CommentButtonProps) => {
  const { data: session } = useSession();

  return (
    <Dialog>
      <DialogTrigger className="flex items-center gap-2 text-sm">
        <MessageCircleIcon size={16} />
        {post.comments.length}
      </DialogTrigger>

      <DialogContent className="space-y-5 border-none bg-transparent shadow-none">
        <div className="bg-card border-border/30 rounded border shadow-lg">
          <DialogHeader className="border-border/30 border-b p-2.5 pb-1.5">
            <DialogTitle>
              Comentários{" "}
              <span className="text-foreground/50 text-sm font-normal">
                (&nbsp;{post.comments.length}&nbsp;)
              </span>
            </DialogTitle>
          </DialogHeader>
          <CommentsList comments={post.comments} />
        </div>

        {session && session.user.id !== post.user.id && (
          <DialogFooter className="bg-card border-border/30 rounded border p-2.5 shadow-lg">
            <CommentForm postId={post.id} />
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CommentButton;
