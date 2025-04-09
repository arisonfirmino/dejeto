"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import SubmitButton from "@/app/components/submit-button";

import { createPost } from "@/app/actions/post";

const schema = yup.object({
  title: yup.string().required("O nome do projeto é obrigatório."),
  description: yup.string().required("A descrição é obrigatória."),
  deploy: yup
    .string()
    .transform((value) => (value === "" ? undefined : value))
    .url("Insira um link válido para o deploy."),
  repo: yup
    .string()
    .transform((value) => (value === "" ? undefined : value))
    .url("Insira um link válido para o repositório."),
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

    await createPost({
      userId: session.user.id,
      title: data.title,
      description: data.description,
      deploy: data.deploy,
      repo: data.repo,
    });

    reset();
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5 px-2.5">
      <Input
        placeholder="Nome do projeto"
        {...register("title")}
        error={errors.title}
      />

      <Textarea
        placeholder="Descrição do projeto"
        {...register("description")}
        error={errors.description}
        className="max-h-14 min-h-14 py-2"
      />

      <Input
        placeholder="Link do deploy"
        {...register("deploy")}
        error={errors.deploy}
      />

      <Input
        placeholder="Link do repositório"
        {...register("repo")}
        error={errors.repo}
      />

      {errors && (
        <p className="ml-2.5 text-xs text-red-400">
          {errors.title?.message ||
            errors.description?.message ||
            errors.deploy?.message ||
            errors.repo?.message}
        </p>
      )}

      <SubmitButton isLoading={isLoading}>Publicar</SubmitButton>
    </form>
  );
};

export default PostForm;
