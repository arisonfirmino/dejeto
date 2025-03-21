import Link from "next/link";

import { cn } from "@/app/lib/utils";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/app/components/ui/avatar";

import { UserIcon } from "lucide-react";

import { User } from "next-auth";

interface UserAvatarProps {
  user: Pick<User, "username" | "avatar">;
  size?: string;
}

const UserAvatar = ({ user, size }: UserAvatarProps) => {
  return (
    <Link href={`/${user.username}`}>
      {user.avatar ? (
        <Avatar className={cn(size ? size : "size-8")}>
          <AvatarImage src={user.avatar} />
          <AvatarFallback>{user.username}</AvatarFallback>
        </Avatar>
      ) : (
        <div
          className={`border-border/30 bg-card flex items-center justify-center rounded-full border ${size ? size : "size-8"}`}
        >
          <UserIcon size={16} />
        </div>
      )}
    </Link>
  );
};

export default UserAvatar;
