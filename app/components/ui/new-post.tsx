import { Button } from "@/app/components/ui/button";

import { BookOpenIcon } from "lucide-react";

import { Session } from "next-auth";

const NewPost = ({ session }: { session: Session | null }) => {
  return (
    <Button disabled={!session} size="icon">
      <BookOpenIcon />
    </Button>
  );
};

export default NewPost;
