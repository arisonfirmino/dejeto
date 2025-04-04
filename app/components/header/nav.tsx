"use client";

import { usePathname } from "next/navigation";

import Link from "next/link";

import { Button } from "@/app/components/ui/button";

import { BookOpenIcon, HomeIcon, UserPlusIcon } from "lucide-react";
import { cn } from "@/app/lib/utils";

const Nav = () => {
  const pathname = usePathname();

  const pages = [
    { label: "Início", icon: <HomeIcon />, href: "/" },
    { label: "Seguindo", icon: <UserPlusIcon />, href: "/following" },
    { label: "Projetos", icon: <BookOpenIcon />, href: "/projects" },
  ];

  return (
    <nav className="flex gap-1 px-1">
      {pages.map((page) => (
        <Button
          key={page.href}
          asChild
          variant="ghost"
          className={cn(
            "flex-1 rounded-none",
            pathname === page.href &&
              "border-primary text-foreground border-b-2",
          )}
        >
          <Link href={page.href}>
            {page.icon} {page.label}
          </Link>
        </Button>
      ))}
    </nav>
  );
};

export default Nav;
