"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import SubmitButton from "@/app/components/ui/submit-button";

import { createNewPost } from "@/app/actions/post";

import { toast } from "sonner";

const schema = yup.object({
  title: yup
    .string()
    .required("O nome do projeto é obrigatório.")
    .min(3, "O nome do projeto deve ter pelo menos 3 caracteres."),
  description: yup
    .string()
    .required("A descrição do projeto é obrigatória.")
    .min(3, "A descrição deve ter pelo menos 3 caracteres."),
  deploy: yup.string().required("").url("Insira uma url válida."),
  repo: yup.string().url("Insira uma url válida."),
});

type FormData = yup.InferType<typeof schema>;

const PostForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    if (!session) return;

    setIsLoading(true);

    await createNewPost({
      data: {
        userId: session.user.id,
        title: data.title,
        description: data.description,
        deploy: data.deploy,
        repo: data.repo,
      },
    });

    reset();
    setIsLoading(false);
    toast("Seu projeto foi compartilhado!");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2.5">
      <Input
        placeholder="Nome do projeto"
        {...register("title")}
        error={errors.title}
      />

      <Textarea
        placeholder="Escreva sobre o projeto"
        {...register("description")}
        error={errors.description}
        className="h-14"
      />

      <Input
        placeholder="Deploy"
        {...register("deploy")}
        error={errors.deploy}
      />

      <Input
        placeholder="Repositório"
        {...register("repo")}
        error={errors.repo}
      />

      {errors && (
        <p className="text-center text-xs text-red-400">
          {errors.title?.message ||
            errors.description?.message ||
            errors.deploy?.message ||
            errors.repo?.message}
        </p>
      )}

      <SubmitButton isLoading={isLoading} />
    </form>
  );
};

export default PostForm;
