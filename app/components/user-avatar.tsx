import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "@/app/components/ui/drawer";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import UserData from "@/app/components/user-data";

import { UserIcon } from "lucide-react";

import { User } from "@prisma/client";

interface UserAvatarProps {
  user: Pick<User, "id" | "username" | "avatar">;
}

const UserAvatar = ({ user }: UserAvatarProps) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        {user.avatar ? (
          <Avatar>
            <AvatarImage src={user.avatar} />
            <AvatarFallback>{user.username}</AvatarFallback>
          </Avatar>
        ) : (
          <span className="hover:border-border/100 border-border/30 flex size-8 items-center justify-center rounded-full border">
            <UserIcon size={16} />
          </span>
        )}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerTitle className="hidden">{user.username}</DrawerTitle>
        <DrawerDescription className="hidden">
          {user.username}
        </DrawerDescription>

        <UserData id={user.id} />
      </DrawerContent>
    </Drawer>
  );
};

export default UserAvatar;
