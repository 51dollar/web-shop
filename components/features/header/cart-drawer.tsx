"use client";

import { useEffect, type FC, type PropsWithChildren } from 'react';
import { Button, Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui';
import Link from "next/link";
import { CartDrawerItem } from "@/components/features/header/cart-drawer-item";
import { useCartStore } from '@/store/cart';

interface Props {
  className?: string;
}

export const CartDrawer: FC<PropsWithChildren<Props>> = ({ className, children }) => {
  const totalAmount = useCartStore(state => state.totalAmount);
  const items = useCartStore(state => state.items);
  const getCartItems = useCartStore(state => state.getCartItems);
  const updateItemQuantity = useCartStore(state => state.updateItemQuantity);
  const removeCartItem = useCartStore(state => state.removeCartItem);

  useEffect(() => {
    getCartItems();
  }, [getCartItems]);

  const onClickCountButton = (id: number, quantity: number, type: "plus" | "minus") => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="flex flex-col justify-between pd-0 bg-gray-100/90">
        <SheetHeader>
          <SheetTitle>
            In cart <span className="font-bold">{items.length} position</span>
          </SheetTitle>
        </SheetHeader>

        <div className="bg-white p-2 overflow-auto scrollbar">
          <div className="w-full">
            <div className="mb-3">
              {
                items.map(item => (
                  <CartDrawerItem
                    key={item.id}
                    id={item.id}
                    imageUrl={item.imageUrl}
                    name={item.name}
                    color={item.color}
                    storage={item.storage}
                    price={item.price}
                    quantity={item.quantity}
                    onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
                    onClickRemoveButton={() => removeCartItem(item.id)}
                  />
                ))
              }
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
                {totalAmount} Br
              </span>
            </div>

            <Button
              asChild
              type="submit"
              className="w-full h-12 text-base"
            >
              <Link href="/cart">
                Place an order
              </Link>
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};