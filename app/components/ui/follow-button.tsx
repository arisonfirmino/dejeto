"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { cn } from "@/app/lib/utils";
import { Button } from "@/app/components/ui/button";

import { isUserFollowing } from "@/app/helpers/isUserFollowing";

import { toggleFollow } from "@/app/actions/follow";

const FollowButton = ({ followingId }: { followingId: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const { data: session } = useSession();

  useEffect(() => {
    const checkFollowing = async () => {
      if (!session) return;

      const isLiked = await isUserFollowing({
        followerId: session.user.id,
        followingId,
      });
      setIsFollowing(isLiked);
    };

    checkFollowing();
  }, [session, followingId]);

  const handleFollow = async () => {
    if (!session) return;

    setIsLoading(true);

    await toggleFollow({ followerId: session.user.id, followingId });

    setIsLoading(false);
    setIsFollowing(!isFollowing);
  };

  return (
    <Button
      size="sm"
      variant="ghost"
      onClick={handleFollow}
      className={cn(
        "text-xs",
        isLoading && "text-muted-foreground",
        isFollowing ? "text-muted-foreground" : "text-primary",
      )}
    >
      {isLoading ? "Carregando" : isFollowing ? "Deixar de seguir" : "Seguir"}
    </Button>
  );
};

export default FollowButton;
