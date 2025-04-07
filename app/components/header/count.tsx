import { Button } from "@/app/components/ui/button";

import { UserPlusIcon, UsersIcon } from "lucide-react";

interface CountProps {
  type: "followers" | "following";
  count: number;
}

const Count = ({ type, count }: CountProps) => {
  return (
    <Button size="sm" variant="outline">
      {type === "followers" ? <UsersIcon /> : <UserPlusIcon />}
      {count}
    </Button>
  );
};

export default Count;
