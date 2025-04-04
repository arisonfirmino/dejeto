"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Input } from "@/app/components/ui/input";
import SubmitButton from "@/app/components/submit-button";

import { createAccount } from "@/app/actions/user";

const schema = yup.object({
  firstName: yup
    .string()
    .required("Por favor, informe seu nome.")
    .min(3, "O nome deve ter pelo menos 3 caracteres.")
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, "O nome deve conter apenas letras."),
  lastName: yup
    .string()
    .required("Por favor, informe seu sobrenome.")
    .min(3, "O sobrenome deve ter pelo menos 3 caracteres.")
    .matches(
      /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/,
      "O sobrenome deve conter apenas letras.",
    ),
  username: yup
    .string()
    .required("O nome de usuário é obrigatório.")
    .min(3, "O nome de usuário deve ter pelo menos 3 caracteres.")
    .matches(/^[a-z0-9._]+$/, "Nome de usuário inválido."),
  email: yup
    .string()
    .required("O email é obrigatório.")
    .email("Por favor, insira um e-mail válido."),
  password: yup
    .string()
    .required("A senha é obrigatória.")
    .min(6, "A senha deve ter pelo menos 6 caracteres."),
  passwordConfirmation: yup
    .string()
    .required("A senha deve ter pelo menos 6 caracteres.")
    .required("A confirmação de senha é obrigatória.")
    .oneOf(
      [yup.ref("password")],
      "As senhas não coincidem. Por favor, verifique.",
    ),
});

type FormData = yup.InferType<typeof schema>;

interface SignUpFormProps {
  onSuccess?: () => void;
}

const SignUpForm = ({ onSuccess }: SignUpFormProps) => {
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

    const response = await createAccount({ data });

    if (response?.error) {
      if (response.type === "username") {
        setError("username", {
          type: "manual",
          message: response.error,
        });
      }

      if (response.type === "email") {
        setError("email", {
          type: "manual",
          message: response.error,
        });
      }

      setIsLoading(false);
      return;
    }

    reset();
    setIsLoading(false);
    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5 px-2.5">
      <div className="flex gap-2.5">
        <Input
          placeholder="Nome"
          {...register("firstName")}
          error={errors.firstName}
        />

        <Input
          placeholder="Sobrenome"
          {...register("lastName")}
          error={errors.lastName}
        />
      </div>

      <div className="flex gap-2.5">
        <Input
          placeholder="Nome de usuário"
          {...register("username")}
          error={errors.username}
        />

        <Input
          placeholder="E-mail"
          {...register("email")}
          error={errors.email}
        />
      </div>

      <Input
        type="password"
        placeholder="Senha"
        {...register("password")}
        error={errors.password}
      />

      <Input
        type="password"
        placeholder="Confirmação de senha"
        {...register("passwordConfirmation")}
        error={errors.passwordConfirmation}
      />

      {errors && (
        <p className="ml-2.5 text-xs text-red-400">
          {errors.firstName?.message ||
            errors.lastName?.message ||
            errors.username?.message ||
            errors.email?.message ||
            errors.password?.message ||
            errors.passwordConfirmation?.message}
        </p>
      )}

      <SubmitButton isLoading={isLoading}>Cadastrar</SubmitButton>
    </form>
  );
};

export default SignUpForm;
