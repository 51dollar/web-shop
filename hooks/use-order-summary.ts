"use client";

import type { CheckoutFormValues } from "@/components/features/cart/checkout/zod-schema";
import { clearCartTotalAmount } from "@/services/cart";
import { useCartStore } from "@/store/cart";
import { useCheckoutStore } from "@/store/checkout";
import { useCallback, useMemo } from "react";

export const useOrderSummary = () => {
  const totalAmount = useCartStore((state) => state.totalAmount);
  const items = useCartStore((state) => state.items);
  const clearCheckout = useCheckoutStore((state) => state.clearCheckout);

  const { deliveryPrice, subtotal, total } = useMemo(() => {
    const price = totalAmount >= 100 ? 0 : 10;
    return {
      deliveryPrice: price,
      subtotal: totalAmount,
      total: totalAmount + price,
    };
  }, [totalAmount]);

  const handlePlaceOrder = useCallback(
    (values: CheckoutFormValues) => {
      const {
        firstName,
        lastName,
        email,
        phone,
        address,
        deliveryTime,
        comment,
      } = values;

      console.log("Order placed:", {
        personalInfo: { firstName, lastName, email, phone },
        deliveryInfo: {
          address,
          deliveryTime,
          ...(comment ? { comment } : {}),
        },
        items,
        total,
      });

      // Api call

      clearCartTotalAmount();
      clearCheckout();
    },
    [clearCheckout, items, total],
  );

  return {
    subtotal,
    deliveryPrice,
    total,
    items,
    handlePlaceOrder,
  };
};
