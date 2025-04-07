"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import { getUser } from "@/app/helpers/getUser";

import { cn } from "@/app/lib/utils";
import { buttonVariants } from "@/app/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/app/components/ui/drawer";
import EditProfileForm from "@/app/components/edit/edit-profile-form";
import LogOutButton from "@/app/components/header/logout-button";

import { MenuIcon } from "lucide-react";

import { User } from "@prisma/client";

const Menu = () => {
  const [user, setUser] = useState<User | null>(null);

  const { data: session } = useSession();

  useEffect(() => {
    if (!session) return;

    const findUser = async () => {
      const user = await getUser({ id: session.user.id });
      setUser(user);
    };

    findUser();
  }, [session]);

  return (
    <Drawer>
      <DrawerTrigger
        disabled={!session}
        className={cn(buttonVariants({ size: "icon", variant: "outline" }))}
      >
        <MenuIcon />
      </DrawerTrigger>
      <DrawerContent className="space-y-5">
        <DrawerHeader>
          <DrawerTitle>Editar perfil</DrawerTitle>
          <DrawerDescription>
            Atualize suas informações pessoais. Essas mudanças serão visíveis
            publicamente no seu perfil.
          </DrawerDescription>
        </DrawerHeader>

        {user && <EditProfileForm user={user} />}

        <DrawerFooter>
          <LogOutButton />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Menu;
