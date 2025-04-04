import { cn } from "@/app/lib/utils";
import { buttonVariants } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";

import { SearchIcon } from "lucide-react";

const Search = () => {
  return (
    <Dialog>
      <DialogTrigger
        className={cn(buttonVariants({ size: "icon", variant: "outline" }))}
      >
        <SearchIcon />
      </DialogTrigger>
      <DialogContent
        className={cn(
          "fixed top-0 left-0 max-w-full translate-x-0 translate-y-0 border-none bg-transparent shadow-none",
        )}
      >
        <DialogTitle>Pesquisar</DialogTitle>
        <DialogDescription>Pesquise aqui</DialogDescription>

        <Input type="search" placeholder="Buscar" />
      </DialogContent>
    </Dialog>
  );
};

export default Search;
