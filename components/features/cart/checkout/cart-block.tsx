"use client";

import { useCallback, useMemo, type FC } from "react";
import { CartDrawerItem } from "@/components/features/cart/cart-drawer-item";
import { useCartStore } from "@/store/cart";
import { FieldSet, FieldLegend } from "@/components/ui";
import { cn } from "@/lib/utils";

interface Props {
    title: string;
    className?: string;
}

export const CartBlock: FC<Props> = ({ title, className }) => {
    const items = useCartStore((state) => state.items);
    const updateItemQuantity = useCartStore((state) => state.updateItemQuantity);
    const removeCartItem = useCartStore((state) => state.removeCartItem);

    const onClickCountButton = useCallback(
        (id: number, quantity: number, type: "plus" | "minus") => {
            const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
            updateItemQuantity(id, newQuantity);
        },
        [updateItemQuantity]
    );


    return (
        <div className={cn("bg-white rounded-[32px] p-4 shadow-sm", className)}>
            <FieldSet>
                <FieldLegend className="font-bold">{title}</FieldLegend>

                <div className="max-h-[500px] overflow-y-auto">
                    <div className="divide-y divide-gray-100">
                        {useMemo(
                            () =>
                                items.map((item) => (
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
                                        onClickCountButton={(type) =>
                                            onClickCountButton(item.id, item.quantity, type)
                                        }
                                        onClickRemoveButton={() => removeCartItem(item.id)}
                                    />
                                )),
                            [items, onClickCountButton, removeCartItem]
                        )}
                    </div>
                </div>
            </FieldSet>
        </div>
    );
};
