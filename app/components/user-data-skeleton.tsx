import { Skeleton } from "@/app/components/ui/skeleton";

const UserDataSkeleton = () => {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between p-2.5">
        <div className="flex items-center gap-2.5">
          <Skeleton className="size-8 rounded-full" />
          <div className="flex flex-col gap-2.5">
            <Skeleton className="h-2 w-20" />
            <Skeleton className="h-2 w-20" />
          </div>
        </div>

        <div className="flex gap-5">
          <Skeleton className="h-8 w-16 rounded-xl" />
          <Skeleton className="h-8 w-16 rounded-xl" />
        </div>
      </div>

      <div className="flex flex-col gap-2 px-2.5">
        <Skeleton className="h-3 w-48" />
        <Skeleton className="h-3 w-48" />
        <Skeleton className="h-3 w-48" />
        <Skeleton className="h-3 w-48" />
        <Skeleton className="h-3 w-48" />
      </div>
    </div>
  );
};

export default UserDataSkeleton;
