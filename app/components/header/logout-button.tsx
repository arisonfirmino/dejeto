"use client";

import { signOut } from "next-auth/react";

import { Button } from "@/app/components/ui/button";

import { LogOutIcon } from "lucide-react";

const LogOutButton = () => {
  return (
    <Button
      onClick={async () => await signOut()}
      className="w-full justify-between"
    >
      Sair
      <LogOutIcon />
    </Button>
  );
};

export default LogOutButton;
