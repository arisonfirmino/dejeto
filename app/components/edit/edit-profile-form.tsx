"use client";

import { useState } from "react";

import { Input } from "@/app/components/ui/input";
import StatePicker from "@/app/components/edit/state-picker";
import SubmitButton from "@/app/components/submit-button";

import { User } from "@prisma/client";

interface EditProfileFormProps {
  user: User;
}

const EditProfileForm = ({ user }: EditProfileFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <form className="space-y-2.5 px-2.5">
      <div className="flex gap-2.5">
        <Input placeholder={user.firstName} />

        <Input placeholder={user.lastName} />
      </div>

      <StatePicker user={user} />

      <Input
        placeholder={
          user.portfolio ? new URL(user.portfolio).hostname : "Portfolio"
        }
      />

      <Input
        placeholder={
          user.github
            ? user.github.replace("https://github.com/", "github/")
            : "GitHub"
        }
      />

      <Input
        placeholder={
          user.linkedin
            ? user.linkedin.replace("https://www.linkedin.com/", "")
            : "LinkedIn"
        }
      />

      <SubmitButton isLoading={isLoading}>Atualizar</SubmitButton>
    </form>
  );
};

export default EditProfileForm;
