import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/app/components/ui/drawer";
import Location from "@/app/components/location";
import UserAvatar from "@/app/components/user-avatar";
import UserLinks from "@/app/components/user-links";
import LogOutButton from "@/app/components/header/logout-button";

import { User } from "@prisma/client";

interface UserDrawerProps {
  user: User;
  showLogoutButton?: boolean;
}

const UserDrawer = ({ user, showLogoutButton = false }: UserDrawerProps) => {
  return (
    <Drawer>
      <DrawerTrigger>
        <UserAvatar user={user} />
      </DrawerTrigger>
      <DrawerContent className="space-y-5">
        <DrawerHeader className="items-center gap-2.5">
          <Location user={user} />

          <UserAvatar user={user} size="size-20" />

          <div>
            <DrawerTitle className="capitalize">
              {user.firstName} {user.lastName}
            </DrawerTitle>
            <DrawerDescription>@{user.username}</DrawerDescription>
          </div>

          <div className="text-foreground/50 flex items-center gap-10 text-xs">
            <p>250 seguidores</p>
            <p>80 seguindo</p>
          </div>
        </DrawerHeader>

        <UserLinks user={user} />

        {showLogoutButton && (
          <DrawerFooter>
            <LogOutButton />
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default UserDrawer;
