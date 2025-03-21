import { cn } from "@/app/lib/utils";
import { buttonVariants } from "@/app/components/ui/button";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/app/components/ui/tooltip";

import {
  GithubIcon,
  GlobeIcon,
  InstagramIcon,
  LinkedinIcon,
} from "lucide-react";

import { User } from "@prisma/client";

interface ContactLinksProps {
  user: Pick<User, "github" | "linkedin" | "instagram" | "portfolio">;
}

const ContactLinks = ({ user }: ContactLinksProps) => {
  const links = [
    { label: "GitHub", icon: <GithubIcon />, href: user.github },
    {
      label: "LinkedIn",
      icon: <LinkedinIcon />,
      href: user.linkedin,
    },
    {
      label: "Instagram",
      icon: <InstagramIcon />,
      href: user.instagram,
    },
    { label: "Portfólio", icon: <GlobeIcon />, href: user.portfolio },
  ];

  return (
    <ul className="flex items-center gap-2.5">
      {links.map((link) => (
        <li key={link.label}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                asChild
                className={cn(
                  buttonVariants({ size: "icon", variant: "outline" }),
                  !link.href && "pointer-events-none opacity-50",
                )}
              >
                {link.href ? (
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.icon}
                  </a>
                ) : (
                  <span>{link.icon}</span>
                )}
              </TooltipTrigger>
              {link.href && (
                <TooltipContent side="bottom">
                  <p>{link.label}</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </li>
      ))}
    </ul>
  );
};

export default ContactLinks;
