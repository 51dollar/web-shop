"use client";

import { useCartStore } from "@/store/cart";
import { useCheckoutStore } from "@/store/checkout";

const MIN_PRICE_TO_FREE_DELIVERY = 1000;
const DELIVERY_PRICE = 20;

export const useOrderSummary = () => {
  const totalAmount = useCartStore((state) => state.totalAmount);
  const items = useCartStore((state) => state.items);
  const clearCheckout = useCheckoutStore((state) => state.clearCheckout);

  const delivery =
    totalAmount >= MIN_PRICE_TO_FREE_DELIVERY ? 0 : DELIVERY_PRICE;

  return {
    deliveryPrice: delivery,
    subtotal: totalAmount,
    total: totalAmount + delivery,
    items,
    clearCheckout,
  };
};
