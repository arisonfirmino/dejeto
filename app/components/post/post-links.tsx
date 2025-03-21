import { formatLink } from "@/app/helpers/formatLink";

import { Button } from "@/app/components/ui/button";

import { BookMarkedIcon, LinkIcon } from "lucide-react";

const PostLinks = () => {
  const links = [
    {
      label: "Deploy",
      icon: <LinkIcon />,
      href: "https://smart-finance-calculator.vercel.app",
    },
    {
      label: "Repositório",
      icon: <BookMarkedIcon />,
      href: "https://github.com/arisonfirmino/smart-finance-calculator",
    },
  ];

  return (
    <div className="flex gap-2.5">
      {links.map((link) => (
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
      ))}
    </div>
  );
};

export default PostLinks;
