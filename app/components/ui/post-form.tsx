"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

import { storage } from "@/app/lib/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import FileUpload from "@/app/components/ui/file-upload";
import SubmitButton from "@/app/components/ui/submit-button";

import { createNewPost } from "@/app/actions/post";

import { v4 as uuidv4 } from "uuid";

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
  deploy: yup
    .string()
    .required("O link de deploy é obrigatório.")
    .url("Insira uma url válida."),
  repo: yup.string().url("Insira uma url válida."),
});

type FormData = yup.InferType<typeof schema>;

const PostForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);

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

    let imageUrl = undefined;

    if (image) {
      const imageRef = ref(
        storage,
        `posts/${session.user.username}-${uuidv4()}-${data.title}`,
      );

      const snapshot = await uploadBytes(imageRef, image);

      imageUrl = await getDownloadURL(snapshot.ref);
    }

    await createNewPost({
      data: {
        userId: session.user.id,
        title: data.title,
        description: data.description,
        deploy: data.deploy,
        repo: data.repo,
        image: imageUrl,
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

      <FileUpload image={image} setImage={setImage} />

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
