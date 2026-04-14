import { Skeleton } from "../skeleton";

export const CartItemSkeleton = () => (
    <div className="flex items-start gap-4 p-4">

        {/* Image */}
        <Skeleton className="w-[60px] h-[60px] rounded-xl shrink-0" />

        {/* Content */}
        <div className="flex-1">

            {/* Title */}
            <Skeleton className="h-5 w-2/3 mb-1 rounded-md" />

            {/* Subtitle */}
            <Skeleton className="h-4 w-1/3 mb-3 rounded-md" />

            {/* Divider */}
            <div className="h-px bg-gray-100 mb-3" />

            {/* Bottom row */}
            <div className="flex items-center justify-between">

                {/* Counter */}
                <div className="flex items-center gap-3">
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <Skeleton className="w-6 h-6 rounded-md" />
                    <Skeleton className="w-10 h-10 rounded-full" />
                </div>

                {/* Price + trash */}
                <div className="flex items-center gap-3">
                    <Skeleton className="w-16 h-5 rounded-md" />
                    <Skeleton className="w-5 h-5 rounded-md" />
                </div>

            </div>
        </div>
    </div>
);