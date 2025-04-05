"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Input } from "@/app/components/ui/input";
import SubmitButton from "@/app/components/submit-button";

import { loginValidator } from "@/app/helpers/loginValidator";

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

interface SignInFormProps {
  onSuccess?: () => void;
}

const SignInForm = ({ onSuccess }: SignInFormProps) => {
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

    const response = await loginValidator({
      identifier: data.identifier,
      password: data.password,
    });

    if (response?.error) {
      if (response.type === "identifier") {
        setError("identifier", {
          type: "manual",
          message: response.error,
        });
      }

      if (response.type === "password") {
        setError("password", {
          type: "manual",
          message: response.error,
        });
      }

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
    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5 px-2.5">
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
        <p className="ml-2.5 text-xs text-red-400">
          {errors.identifier?.message || errors.password?.message}
        </p>
      )}

      <SubmitButton isLoading={isLoading}>Entrar</SubmitButton>
    </form>
  );
};

export default SignInForm;
