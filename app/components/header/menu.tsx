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
import LogOutButton from "@/app/components/header/logout-button";

import { MenuIcon } from "lucide-react";

const Menu = () => {
  return (
    <Drawer>
      <DrawerTrigger
        className={cn(buttonVariants({ size: "icon", variant: "outline" }))}
      >
        <MenuIcon />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <LogOutButton />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Menu;
