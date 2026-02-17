import { Skeleton } from "@/components/ui";

export const FiltersSkeleton = () => {
    return (
        <div className="space-y-6">
            <Skeleton className="h-5 w-24" />

            <div className="border-b border-neutral-100 pb-4 space-y-4">
                <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-24" />
                </div>

                <div className="flex gap-3">
                    <Skeleton className="h-10 flex-1 rounded-xl" />
                    <Skeleton className="h-10 flex-1 rounded-xl" />
                </div>

                <Skeleton className="h-4 w-full rounded-full" />
            </div>

            <div className="space-y-3">
                <Skeleton className="h-4 w-32" />
                {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-4 w-full" />
                ))}
                <Skeleton className="h-4 w-20 mt-2" />
            </div>

            <div className="space-y-5">
                {[1, 2].map((block) => (
                    <div key={block} className="space-y-3">
                        <Skeleton className="h-4 w-28" />
                        {Array.from({ length: 3 }).map((_, i) => (
                            <Skeleton key={i} className="h-4 w-full" />
                        ))}
                    </div>
                ))}
            </div>

        </div>
    );
};
