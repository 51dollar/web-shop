"use client";

import type { FC, PropsWithChildren } from 'react';
import { Button, Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui';
import Link from "next/link";
import { CartDrawerItem } from "@/components/features/header/cart-drawer-item";

interface Props {
  className?: string;
}

export const CartDrawer: FC<PropsWithChildren<Props>> = ( {className, children} ) => {
  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pd-0 bg-gray-100/90">
        <SheetHeader>
          <SheetTitle>
            In cart <span className="font-bold">3 position</span>
          </SheetTitle>
        </SheetHeader>

        <div className="bg-white p-2 overflow-auto scrollbar">
          <div className="w-full">
            <div className="mb-3">
              <CartDrawerItem
                id={1}
                imageUrl={"/logo.png"}
                name={"iphone 16"}
                variant={"256 white"}
                price={2500}
                quantity={1}
              />
            </div>
          </div>
        </div>

        <SheetFooter className="bg-white p-6">
          <div className="w-full">
            <div className="flex mb-4">
              <span className="flex flex-1 text-lg text-neutral-500">
                Total
              <div className="flex-1 border-b border-dashed border-b-neutral-200 relative top-1 mx-2" />
              </span>

              <span className="font-bold text-lg">
                500 Br
              </span>
            </div>

            <Link href="/cart">
              <Button
                type="submit"
                className="w-full h-12 text-base"
              >
                Place an order
              </Button>
            </Link>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};