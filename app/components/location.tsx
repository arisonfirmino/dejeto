import { PinIcon } from "lucide-react";

import { User } from "@prisma/client";

interface LocationProps {
  user: Pick<User, "location">;
}

const Location = ({ user }: LocationProps) => {
  return (
    <p className="flex items-center justify-center gap-1.5 text-xs">
      <PinIcon size={12} className="text-primary" />
      {user.location ? user.location : "Sem localização"}
    </p>
  );
};

export default Location;
