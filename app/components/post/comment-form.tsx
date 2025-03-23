"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Textarea } from "@/app/components/ui/textarea";
import { Button } from "@/app/components/ui/button";

import { LoaderCircleIcon, SendIcon } from "lucide-react";

import { addComment } from "@/app/actions/comment";

const schema = yup.object({
  content: yup.string().required().min(3),
});

type FormData = yup.InferType<typeof schema>;

const CommentForm = ({ postId }: { postId: string }) => {
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

    await addComment({
      userId: session.user.id,
      postId,
      content: data.content,
    });

    reset();
    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full items-center gap-2.5"
    >
      <Textarea
        placeholder="Deixe um comentário"
        {...register("content")}
        error={errors.content}
      />

      <Button type="submit" disabled={isLoading} size="icon">
        {isLoading ? (
          <LoaderCircleIcon className="animate-spin" />
        ) : (
          <SendIcon />
        )}
      </Button>
    </form>
  );
};

export default CommentForm;
