"use client";

import { useState } from "react";

import { cn } from "@/app/lib/utils";
import { buttonVariants } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import SignInForm from "@/app/components/signin/signin-form";

import { LogInIcon } from "lucide-react";

const SignIn = () => {
  const [formType, setFormType] = useState<"signin" | "signup">("signin");

  return (
    <Dialog>
      <DialogTrigger
        className={cn(buttonVariants({ size: "icon", variant: "outline" }))}
      >
        <LogInIcon />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {formType === "signin" ? "Acesse sua conta" : "Crie sua conta"}
          </DialogTitle>
          <DialogDescription>
            {formType === "signin"
              ? "Faça login para utilizar todos os recursos da aplicação."
              : "Cadastre-se e comece a usar a aplicação agora mesmo!"}
          </DialogDescription>
        </DialogHeader>

        {formType === "signin" ? <SignInForm /> : ""}

        <DialogFooter>
          <button
            onClick={() =>
              setFormType(formType === "signin" ? "signup" : "signin")
            }
            className="text-lowercase hover:text-primary active:text-primary text-muted-foreground text-xs hover:underline active:underline"
          >
            {formType === "signin"
              ? "Ainda não tem uma conta?"
              : "Já tenho uma conta"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SignIn;
