import { MapPinIcon } from "lucide-react";

import { User } from "@prisma/client";

interface LocationProps {
  user: Pick<User, "location">;
}

const Location = ({ user }: LocationProps) => {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span>
        <MapPinIcon size={16} className="text-primary" />
      </span>
      {user.location}
    </div>
  );
};

export default Location;
