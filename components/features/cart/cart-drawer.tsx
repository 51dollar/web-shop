"use client";

import Image from "next/image";
import { useEffect, useState, type FC, type PropsWithChildren } from 'react';
import { Button, Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger, Title } from '@/components/ui';
import Link from "next/link";
import { CartDrawerItem } from "@/components/features/cart/cart-drawer-item";
import { useCartStore } from '@/store/cart';
import { ArrowLeft02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

interface Props {
  className?: string;
}

export const CartDrawer: FC<PropsWithChildren<Props>> = ({ className, children }) => {
  const totalAmount = useCartStore(state => state.totalAmount);
  const items = useCartStore(state => state.items);
  const getCartItems = useCartStore(state => state.getCartItems);
  const updateItemQuantity = useCartStore(state => state.updateItemQuantity);
  const removeCartItem = useCartStore(state => state.removeCartItem);

  const [redirecting, setRedirecting] = useState(false);

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

      <SheetContent className="flex flex-col p-0 bg-gray-50 w-full sm:max-w-[450px]">
        <div className="flex flex-col h-full">
          {!totalAmount && (
            <div className="flex flex-1 flex-col items-center justify-center text-center px-8">
              <div className="bg-gray-100 rounded-full p-6 mb-6">
                <Image
                  src="/logo.png"
                  alt="empty cart"
                  width={80}
                  height={80}
                  className="transform translate-y-1"
                />
              </div>

              <Title
                size="sm"
                text="Your cart is empty"
                className="text-center font-bold text-2xl mb-3"
              />

              <p className="text-center text-gray-500 text-sm max-w-[220px]">
                Looks like you haven&apos;t added any products yet
              </p>

              <SheetClose className="mt-10">
                <Button
                  variant="outline"
                  className="group relative w-52 h-12 text-base border-2 hover:border-gray-300 transition-all duration-300"
                >
                  <HugeiconsIcon
                    icon={ArrowLeft02Icon}
                    size={18}
                    className="absolute left-5 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-x-1"
                  />
                  <span className="transition-all duration-300 group-hover:translate-x-2">
                    Continue shopping
                  </span>
                </Button>
              </SheetClose>
            </div>
          )}

          {totalAmount > 0 && (
            <>
              <SheetHeader className="border-b border-gray-200 px-6 py-4 bg-white">
                <SheetTitle className="flex items-center justify-between">
                  <span className="text-2xl font-bold">My Cart</span>
                  <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full mx-7">
                    {items.length} {items.length === 1 ? 'item' : 'items'}
                  </span>
                </SheetTitle>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto bg-gray-50">
                <div className="divide-y divide-gray-100">
                  {items.map(item => (
                    <CartDrawerItem
                      key={item.id}
                      id={item.id}
                      imageUrl={item.imageUrl}
                      name={item.name}
                      color={item.color}
                      storage={item.storage}
                      price={item.price}
                      quantity={item.quantity}
                      disabled={item.disabled ?? false}
                      onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
                      onClickRemoveButton={() => removeCartItem(item.id)}
                    />
                  ))}
                </div>
              </div>

              <SheetFooter className="bg-white p-6 border-t border-gray-200 shadow-lg">
                <div className="w-full space-y-4">
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-gray-600 font-medium">Total</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-gray-900">
                        {totalAmount}
                      </span>
                      <span className="text-sm text-gray-500">Br</span>
                    </div>
                  </div>

                  <Button
                    asChild
                    onClick={() => setRedirecting(true)}
                    loading={redirecting}
                    className="w-full h-12 text-base font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <Link href="/checkout">
                      Go to the order
                    </Link>
                  </Button>
                </div>
              </SheetFooter>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};