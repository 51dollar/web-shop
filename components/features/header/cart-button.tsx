import type { FC } from 'react';
import { Button } from '@/components/ui';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowRight02Icon, ShoppingBasket01Icon } from '@hugeicons/core-free-icons';
import { cn } from '@/lib/utils';
import { CartDrawer } from "@/components/features/header/cart-drawer";

interface Props {
  className?: string,
}

export const CartButton: FC<Props> = ( {className} ) => {
  return (
    <CartDrawer>
      <Button className={cn("group relative", className)}>
        <b>500p</b>
        <span className="h-full w-px bg-white/30 mx-2" />
        <div className="flex item-center transition duration-300 group-hover:opacity-0">
          <HugeiconsIcon size={14} className="relative" icon={ShoppingBasket01Icon} />
          <b>3</b>
        </div>
        <HugeiconsIcon size={20} className="absolute right-5 transition duration-300
       -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                       icon={ArrowRight02Icon} />
      </Button>
    </CartDrawer>
  );
};