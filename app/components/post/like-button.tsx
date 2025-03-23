"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import { Button } from "@/app/components/ui/button";

import { HeartIcon, LoaderCircleIcon } from "lucide-react";

import { toggleLike } from "@/app/actions/like";
import { isPostLiked } from "@/app/helpers/isPostLiked";

import { Prisma } from "@prisma/client";

interface LikeButtonProps {
  post: Prisma.PostGetPayload<{
    include: {
      user: true;
      likes: true;
    };
  }>;
}

const LikeButton = ({ post }: LikeButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const { data: session } = useSession();

  useEffect(() => {
    const checkIsLiked = async () => {
      if (!session) return;

      const isLiked = await isPostLiked({
        userId: session.user.id,
        postId: post.id,
      });

      setIsLiked(isLiked);
    };

    checkIsLiked();
  }, [session, post.user.id, post.id]);

  const handleLike = async () => {
    if (!session) return;

    setIsLoading(true);

    await toggleLike({
      userId: session.user.id,
      postId: post.id,
    });

    setIsLoading(false);
    setIsLiked(!isLiked);
  };

  return (
    <Button
      disabled={isLoading}
      size="sm"
      variant="outline"
      onClick={handleLike}
    >
      {isLoading ? (
        <LoaderCircleIcon className="animate-spin" />
      ) : (
        <HeartIcon className={isLiked ? "text-primary fill-primary" : ""} />
      )}
      <span>{post.likes.length}</span>
    </Button>
  );
};

export default LikeButton;
