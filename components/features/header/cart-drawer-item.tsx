import type { FC } from "react";
import { cn } from "@/lib/utils";
import {
  CartItemDetailsImage,
  CartItemDetailsPrice,
  CartItemInfo
} from "@/components/features/header/cart-item-details";
import type { CartItemProps } from "@/components/features/header/types";
import { CountButton } from "@/components/ui";
import { HugeiconsIcon } from "@hugeicons/react";
import { Delete02Icon } from "@hugeicons/core-free-icons";

interface Props extends CartItemProps {
  className?: string;
}

export const CartDrawerItem: FC<Props> = ( {
  id,
  imageUrl,
  variant,
  name,
  price,
  quantity,
  disabled,
  className
} ) => {
  return (
    <div className={cn("flex p-5 gap-6", className)}>
      <CartItemDetailsImage src={imageUrl} alt={name} />

      <div className="flex-1">
        <CartItemInfo name={name} variant={variant} />

        <hr className="my-3" />

        <div className="flex items-center justify-between">
          <CountButton onClick={type => console.log(type)} value={quantity} />

          <div className="flex items-center gap-3">
            <CartItemDetailsPrice value={price} />

            <HugeiconsIcon
              icon={Delete02Icon}
              size={16}
              className="text-gray-400 cursor-pointer hover:text-gray-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
};