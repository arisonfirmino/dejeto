"use client";

import { usePathname } from "next/navigation";

import Link from "next/link";

import { cn } from "@/app/lib/utils";
import { Button } from "@/app/components/ui/button";

import { BookOpenIcon, HomeIcon, UserIcon } from "lucide-react";

const Nav = () => {
  const pathname = usePathname();

  const pages = [
    { label: "Timeline", icon: <HomeIcon />, href: "/" },
    { label: "Seguindo", icon: <UserIcon />, href: "/following" },
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
            pathname === page.href && "border-primary border-b-2",
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
