import { cn } from "@/app/lib/utils";
import { buttonVariants } from "@/app/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/app/components/ui/drawer";
import EditProfileForm from "@/app/components/edit/edit-profile-form";

import { MenuIcon } from "lucide-react";

import { User } from "@prisma/client";

interface MenuProps {
  user: User | null;
}

const Menu = ({ user }: MenuProps) => {
  return (
    <Drawer>
      <DrawerTrigger
        disabled={!user}
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
      </DrawerContent>
    </Drawer>
  );
};

export default Menu;
