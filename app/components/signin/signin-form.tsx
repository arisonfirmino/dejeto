"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Input } from "@/app/components/ui/input";
import SubmitButton from "@/app/components/signin/submit-button";

import { authenticateUser } from "@/app/helpers/authenticateUser";

import { toast } from "sonner";

const schema = yup.object({
  identifier: yup
    .string()
    .required(
      "O e-mail ou nome de usuário é obrigatório. Por favor, informe um dos dois.",
    ),
  password: yup
    .string()
    .required(
      "A senha é obrigatória. Por favor, insira sua senha para continuar.",
    ),
});

type FormData = yup.InferType<typeof schema>;

const SignInForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    const response = await authenticateUser({
      identifier: data.identifier,
      password: data.password,
    });

    if (response?.error && response.type === "identifier") {
      setError("identifier", {
        type: "manual",
        message: response.error,
      });

      setIsLoading(false);
      return;
    }

    if (response?.error && response.type === "password") {
      setError("password", {
        type: "manual",
        message: response.error,
      });

      setIsLoading(false);
      return;
    }

    await signIn("credentials", {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    });

    reset();
    setIsLoading(false);
    toast("Bem vindo(a) de volta!");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2.5">
      <Input
        placeholder="E-mail ou nome de usuário"
        {...register("identifier")}
        error={errors.identifier}
      />

      <Input
        type="password"
        placeholder="Senha"
        {...register("password")}
        error={errors.password}
      />

      {errors && (
        <p className="text-center text-xs text-red-400">
          {errors.identifier?.message || errors.password?.message}
        </p>
      )}

      <SubmitButton isLoading={isLoading} />
    </form>
  );
};

export default SignInForm;
