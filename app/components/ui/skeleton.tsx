import { cn } from "@/app/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-md bg-black/30", className)}
      {...props}
    />
  );
}

export { Skeleton };
