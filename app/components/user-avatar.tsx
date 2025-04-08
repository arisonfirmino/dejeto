import { cn } from "@/app/lib/utils";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/app/components/ui/avatar";

import { UserIcon } from "lucide-react";

import { User } from "@prisma/client";

interface UserAvatarProps {
  user: Pick<User, "avatar" | "username">;
  size?: string;
}

const UserAvatar = ({ user, size }: UserAvatarProps) => {
  return user.avatar ? (
    <Avatar className={cn(size ? size : "size-8")}>
      <AvatarImage src={user.avatar} />
      <AvatarFallback>{user.username}</AvatarFallback>
    </Avatar>
  ) : (
    <span
      className={`bg-muted/5 border-border/30 flex ${size ? size : "size-8"} items-center justify-center rounded-full border`}
    >
      <UserIcon size={16} />
    </span>
  );
};

export default UserAvatar;
