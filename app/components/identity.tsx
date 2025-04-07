import UserAvatar from "@/app/components/user-avatar";

import { User } from "@prisma/client";

interface IdentityProps {
  user: Pick<User, "id" | "firstName" | "lastName" | "username" | "avatar">;
}

const Identity = ({ user }: IdentityProps) => {
  return (
    <div className="flex items-center gap-2.5">
      <UserAvatar user={user} />
      <div>
        <h4 className="text-sm font-medium">
          {user.firstName} {user.lastName}
        </h4>
        <p className="text-foreground/50 text-xs">@{user.username}</p>
      </div>
    </div>
  );
};

export default Identity;
