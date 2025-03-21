import * as React from "react";

import { cn } from "@/app/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input/30 placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 aria-invalid:border-destructive flex field-sizing-content h-8 w-full resize-none rounded-xl border bg-transparent px-3 py-1.5 text-sm transition-[color,box-shadow] outline-none placeholder:lowercase focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 [&::-webkit-scrollbar]:hidden",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
