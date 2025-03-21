import { Button } from "@/app/components/ui/button";

import { HeartIcon } from "lucide-react";

const LikeButton = () => {
  return (
    <Button size="sm" variant="outline">
      <HeartIcon />
      <span>150</span>
    </Button>
  );
};

export default LikeButton;
