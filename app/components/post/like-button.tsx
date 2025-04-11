"use client";

import { useEffect, useState } from "react";

import { useSession } from "next-auth/react";

import { HeartIcon, LoaderCircleIcon } from "lucide-react";

import { isPostLiked } from "@/app/helpers/isPostLiked";

import { toggleLike } from "@/app/actions/like";

const LikeButton = ({ postId }: { postId: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const { data: session } = useSession();

  useEffect(() => {
    const checkIsLiked = async () => {
      if (!session) return;

      const isLiked = await isPostLiked({
        userId: session.user.id,
        postId,
      });

      setIsLiked(isLiked);
    };

    checkIsLiked();
  }, [session, postId]);

  const handleLike = async () => {
    if (!session) return;

    setIsLoading(true);

    await toggleLike({
      userId: session.user.id,
      postId,
    });

    setIsLoading(false);
    setIsLiked(!isLiked);
  };

  return (
    <button disabled={isLoading} onClick={handleLike}>
      {isLoading ? (
        <LoaderCircleIcon size={16} className="animate-spin" />
      ) : (
        <HeartIcon
          size={16}
          className={isLiked ? "fill-primary text-primary" : ""}
        />
      )}
    </button>
  );
};

export default LikeButton;
