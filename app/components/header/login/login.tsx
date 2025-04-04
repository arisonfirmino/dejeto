"use client";

import { useState } from "react";

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
import SignInForm from "@/app/components/header/login/signin-form";
import SignUpForm from "@/app/components/header/login/signup-form";

import { LogInIcon } from "lucide-react";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <Drawer>
      <DrawerTrigger
        className={cn(buttonVariants({ size: "icon", variant: "outline" }))}
      >
        <LogInIcon />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{isSignUp ? "Cadastrar" : "Entrar"}</DrawerTitle>
          <DrawerDescription>
            {isSignUp ? "Já tem uma conta?" : "Ainda não tem uma conta?"}
            &nbsp;
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-primary cursor-pointer hover:underline"
            >
              {isSignUp ? "Fazer login" : "Criar conta"}
            </button>
          </DrawerDescription>
        </DrawerHeader>

        {isSignUp ? <SignUpForm /> : <SignInForm />}
      </DrawerContent>
    </Drawer>
  );
};

export default Login;
