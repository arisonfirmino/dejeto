"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import { getUser } from "@/app/helpers/getUser";

import {
  Card,
  CardHeader,
  CardDescription,
  CardFooter,
} from "@/app/components/ui/card";
import Identity from "@/app/components/ui/identity";
import FollowCount from "@/app/components/ui/follow-count";
import ContactLinks from "@/app/components/ui/contact-links";
import ShareButton from "@/app/components/ui/share-button";

import { Prisma } from "@prisma/client";

type UserProps = Prisma.UserGetPayload<{
  include: { followers: true; following: true };
}>;

const UserCard = () => {
  const [user, setUser] = useState<UserProps | null>(null);

  const { data: session } = useSession();

  useEffect(() => {
    if (!session) return;

    const findUser = async () => {
      const user = await getUser({ id: session.user.id });

      if (!user) return null;

      setUser(user);
    };

    findUser();
  }, [session]);

  return (
    user && (
      <Card className="border-border/15 border-b p-5">
        <CardHeader className="flex items-center justify-between">
          <Identity user={user} />
          <FollowCount
            followersCount={user.followers.length}
            followingCount={user.following.length}
          />
        </CardHeader>

        {user.bio && (
          <CardDescription className="line-clamp-2">{user.bio}</CardDescription>
        )}

        <CardFooter className="justify-between">
          <ContactLinks user={user} />
          <ShareButton />
        </CardFooter>
      </Card>
    )
  );
};

export default UserCard;
