import { formatLink } from "@/app/helpers/formatLink";

import { Button } from "@/app/components/ui/button";

import { BookMarkedIcon, LinkIcon } from "lucide-react";

import { Post } from "@prisma/client";

interface PostLinksProps {
  post: Pick<Post, "deploy" | "repo">;
}

const PostLinks = ({ post }: PostLinksProps) => {
  const links = [
    {
      label: "Deploy",
      icon: <LinkIcon />,
      href: post.deploy,
    },
    {
      label: "Repositório",
      icon: <BookMarkedIcon />,
      href: post.repo,
    },
  ];

  return (
    <div className="flex gap-2.5">
      {links.map(
        (link) =>
          link.href && (
            <Button
              key={link.label}
              asChild
              size="link"
              variant="link"
              className="flex-1 justify-start truncate"
            >
              <a href={link.href} target="_blank" rel="noopener noreferrer">
                {link.icon}
                <span className="truncate">{formatLink(link.href)}</span>
              </a>
            </Button>
          ),
      )}
    </div>
  );
};

export default PostLinks;
