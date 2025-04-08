import { cn } from "@/app/lib/utils";
import { buttonVariants } from "@/app/components/ui/button";

import { User } from "@prisma/client";

import { GithubIcon, LinkedinIcon, LinkIcon, MailIcon } from "lucide-react";

import { formatlink } from "@/app/helpers/formatLink";

interface UserLinksProps {
  user: Pick<User, "email" | "portfolio" | "github" | "linkedin">;
}

const UserLinks = ({ user }: UserLinksProps) => {
  const links = [
    { label: user.email, icon: <MailIcon />, href: `mailto:${user.email}` },
    {
      label: formatlink(user.portfolio),
      icon: <LinkIcon />,
      href: user.portfolio,
    },
    { label: formatlink(user.github), icon: <GithubIcon />, href: user.github },
    {
      label: formatlink(user.linkedin),
      icon: <LinkedinIcon />,
      href: user.linkedin,
    },
  ];

  return (
    <ul className="space-y-2 px-5">
      {links.map(
        (link) =>
          link.href && (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ size: "link", variant: "link" }),
                )}
              >
                <span className="text-primary">{link.icon}</span>
                {link.label}
              </a>
            </li>
          ),
      )}
    </ul>
  );
};

export default UserLinks;
