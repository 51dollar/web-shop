import { cn } from "@/lib/utils";
import type { FC } from "react";

interface Props {
  name: string;
  variant: string;
  className?: string;
}

export const CartItemInfo: FC<Props> = ( {name, variant, className} ) => {
  return (
    <div>
      <div className={cn('flex items-center justify-between', className)}>
        <h2 className="text-lg font-bold flex-1 leading-6">{name}</h2>
      </div>
      {variant && <p className="text-xs text-gray-400 w-[90%]">{variant}</p>}
    </div>
  );
};