import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/components/ui/tooltip";
import { Post } from "@prisma/client";

import { GlobeIcon, BookMarkedIcon } from "lucide-react";

interface PostsLinksProps {
  post: Pick<Post, "deploy" | "repo">;
}

const PostsLinks = ({ post }: PostsLinksProps) => {
  const links = [
    {
      label: "Deploy",
      icon: <GlobeIcon size={16} />,
      href: post.deploy,
    },
    {
      label: "Repositório",
      icon: <BookMarkedIcon size={16} />,
      href: post.repo,
    },
  ];

  return (
    <div className="flex items-center gap-2.5">
      {links.map(
        (link) =>
          link.href && (
            <TooltipProvider key={link.label}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-foreground/50"
                  >
                    {link.icon}
                  </a>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>{link.label}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ),
      )}
    </div>
  );
};

export default PostsLinks;
