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
  onClickCountButton?: (type: "plus" | "minus") => void;
  onClickRemoveButton?: () => void;
  className?: string;
}

export const CartDrawerItem: FC<Props> = ({
  id,
  imageUrl,
  name,
  color,
  storage,
  price,
  quantity,
  disabled,
  onClickRemoveButton,
  onClickCountButton,
  className
}) => {
  const variant = `${color}, ${storage}`;

  return (
    <div className={cn("flex p-5 gap-6", { "opacity-50 pointer-events-none": disabled }, className)}>
      <CartItemDetailsImage src={imageUrl} alt={name} />

      <div className="flex-1">
        <CartItemInfo name={name} variant={variant} />

        <hr className="my-3" />

        <div className="flex items-center justify-between">
          <CountButton onClick={onClickCountButton} value={quantity} />

          <div className="flex items-center gap-3">
            <CartItemDetailsPrice value={price} />

            <HugeiconsIcon
              onClick={onClickRemoveButton}
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