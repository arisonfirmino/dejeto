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
      autoComplete="off"
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground border-input/30 flex h-10 w-full min-w-0 rounded-2xl border bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:lowercase disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
        error &&
          "border-red-400 focus-visible:border-red-400 focus-visible:ring-red-400",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
