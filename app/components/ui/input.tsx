import * as React from "react";

import { cn } from "@/app/lib/utils";
import { FieldError } from "react-hook-form";

interface InputProps extends React.ComponentProps<"input"> {
  error?: FieldError | undefined;
}

function Input({ className, type, error, ...props }: InputProps) {
  return (
    <input
      type={type}
      data-slot="input"
      autoComplete="off"
      className={cn(
        "file:text-foreground bg-card placeholder:text-foreground/50 selection:bg-primary selection:text-primary-foreground border-input/30 flex h-10 w-full min-w-0 truncate rounded-2xl border px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        error && "border-red-600 focus-visible:border-red-600",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
