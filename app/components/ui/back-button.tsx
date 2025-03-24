"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/app/components/ui/button";

import { ChevronLeftIcon } from "lucide-react";

const BackButton = () => {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <Button
      onClick={handleBack}
      variant="ghost"
      className="w-full rounded-none"
    >
      <ChevronLeftIcon />
      Voltar
    </Button>
  );
};

export default BackButton;
