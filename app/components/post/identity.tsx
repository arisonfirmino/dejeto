import UserDrawer from "@/app/components/user-drawer";

import { User } from "@prisma/client";

interface IdentityProps {
  user: User;
}

const Identity = ({ user }: IdentityProps) => {
  return (
    <div className="flex items-center gap-2.5">
      <UserDrawer user={user} />
      <div>
        <p className="text-sm font-medium capitalize">
          {user.firstName} {user.lastName}
        </p>
        <p className="text-foreground/50 text-xs">@{user.username}</p>
      </div>
    </div>
  );
};

export default Identity;
