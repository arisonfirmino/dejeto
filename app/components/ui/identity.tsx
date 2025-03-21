import UserAvatar from "@/app/components/user-avatar";

import { User } from "@prisma/client";

interface IdentityProps {
  user: Pick<User, "firstName" | "lastName" | "username" | "avatar">;
}

const Identity = ({ user }: IdentityProps) => {
  return (
    <div className="flex items-center gap-2.5">
      <UserAvatar user={user} size="size-12" />
      <div>
        <h2 className="text-base font-medium capitalize">
          {user.firstName} {user.lastName}
        </h2>
        <p className="text-muted-foreground text-sm">@{user.username}</p>
      </div>
    </div>
  );
};

export default Identity;
