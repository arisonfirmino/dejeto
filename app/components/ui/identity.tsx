import UserAvatar from "@/app/components/ui/user-avatar";

import { User } from "@prisma/client";

interface IdentityProps {
  user: Pick<User, "firstName" | "lastName" | "username" | "avatar">;
  size?: string;
  fontSize?: string;
}

const Identity = ({ user, size, fontSize }: IdentityProps) => {
  return (
    <div className="flex items-center gap-2.5">
      <UserAvatar user={user} size={size ? size : "size-12"} />
      <div>
        <h2
          className={`font-medium capitalize ${fontSize ? fontSize : "text-base"}`}
        >
          {user.firstName} {user.lastName}
        </h2>
        <p
          className={`text-muted-foreground ${fontSize ? fontSize : "text-sm"}`}
        >
          @{user.username}
        </p>
      </div>
    </div>
  );
};

export default Identity;
