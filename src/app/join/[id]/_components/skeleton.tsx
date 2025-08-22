import { Skeleton } from "@/components/ui/skeleton";

const InvitationSkeleton = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="rounded-2xl border p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <Skeleton className="h-8 w-3/4 mx-auto mb-2" />
          <Skeleton className="h-4 w-1/2 mx-auto" />
        </div>

        <div className="flex items-center justify-center mb-8">
          <Skeleton className="w-20 h-20 rounded-full" />
        </div>

        <div className="text-center mb-8">
          <Skeleton className="h-5 w-4/5 mx-auto mb-2" />
          <Skeleton className="h-6 w-3/4 mx-auto" />
        </div>

        <div className="rounded-lg p-4 mb-8">
          <div className="flex items-start">
            <Skeleton className="w-5 h-5 mt-0.5 mr-3 rounded-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Skeleton className="flex-1 h-12 rounded-lg" />
          <Skeleton className="flex-1 h-12 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default InvitationSkeleton;
