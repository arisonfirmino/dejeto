"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Input } from "@/app/components/ui/input";
import StatePicker from "@/app/components/edit/state-picker";
import SubmitButton from "@/app/components/submit-button";

import { updateUserData } from "@/app/actions/user";

import { User } from "@prisma/client";

const schema = yup.object({
  firstName: yup
    .string()
    .transform((value) => (value === "" ? undefined : value))
    .min(3, "O nome deve ter pelo menos 3 caracteres.")
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, "O nome deve conter apenas letras."),
  lastName: yup
    .string()
    .transform((value) => (value === "" ? undefined : value))
    .min(3, "O sobrenome deve ter pelo menos 3 caracteres.")
    .matches(
      /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/,
      "O sobrenome deve conter apenas letras.",
    ),
  location: yup
    .string()
    .transform((value) => (value === "" ? undefined : value)),
  portfolio: yup
    .string()
    .transform((value) => (value === "" ? undefined : value))
    .url("Informe uma URL válida."),
  github: yup
    .string()
    .transform((value) => (value === "" ? undefined : value))
    .matches(
      /^https:\/\/github\.com\/[a-zA-Z0-9_-]+$/,
      "Informe uma URL válida.",
    ),
  linkedin: yup
    .string()
    .transform((value) => (value === "" ? undefined : value))
    .matches(
      /^https:\/\/www\.linkedin\.com\/in\/[a-zA-Z0-9_-]+$/,
      "Informe uma URL válida.",
    ),
});

type FormData = yup.InferType<typeof schema>;

interface EditProfileFormProps {
  user: User;
}

const EditProfileForm = ({ user }: EditProfileFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();

  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const values = watch();

  const allFieldsEmpty = Object.values(values).every(
    (value) => !value || value === "",
  );

  const onSubmit = async (data: FormData) => {
    if (!session) return;

    setIsLoading(true);

    await updateUserData({
      data: {
        userId: session.user.id,
        firstName: data.firstName,
        lastName: data.lastName,
        location: data.location,
        portfolio: data.portfolio,
        github: data.github,
        linkedin: data.linkedin,
      },
    });

    reset({
      firstName: "",
      lastName: "",
      location: "",
      portfolio: "",
      github: "",
      linkedin: "",
    });
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5 px-2.5">
      <div className="flex gap-2.5">
        <Input
          placeholder={user.firstName}
          {...register("firstName")}
          error={errors.firstName}
        />

        <Input
          placeholder={user.lastName}
          {...register("lastName")}
          error={errors.lastName}
        />
      </div>

      <Controller
        control={control}
        name="location"
        render={({ field }) => (
          <StatePicker
            user={user}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />

      <Input
        placeholder={
          user.portfolio
            ? new URL(user.portfolio).hostname
            : "Adicione o link do seu portfólio"
        }
        {...register("portfolio")}
        error={errors.portfolio}
      />

      <Input
        placeholder={
          user.github
            ? user.github.replace("https://github.com/", "github/")
            : "Adicione o link do seu GitHub"
        }
        {...register("github")}
        error={errors.github}
      />

      <Input
        placeholder={
          user.linkedin
            ? user.linkedin.replace("https://www.linkedin.com/", "")
            : "Adicione o link do seu LinkedIn"
        }
        {...register("linkedin")}
        error={errors.linkedin}
      />

      {errors && (
        <p className="ml-2.5 text-xs text-red-400">
          {errors.firstName?.message ||
            errors.lastName?.message ||
            errors.portfolio?.message ||
            errors.github?.message ||
            errors.linkedin?.message}
        </p>
      )}

      <SubmitButton disabled={allFieldsEmpty} isLoading={isLoading}>
        Atualizar
      </SubmitButton>
    </form>
  );
};

export default EditProfileForm;
