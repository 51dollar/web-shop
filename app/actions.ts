"use server";

import type { CheckoutFormValues } from "@/components/features/cart/checkout/zod-schema";
import { OrderStatus } from "@/lib/generated/prisma-client";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function createOrder(data: CheckoutFormValues) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("cartToken")?.value;

    if (!token) {
      throw new Error("Cart token not found");
    }

    const result = await prisma.$transaction(async (tx) => {
      const userCart = await tx.cart.findUnique({
        where: { token },
        include: {
          cartItems: {
            orderBy: { createdAt: "desc" },
            include: { productVariant: { include: { product: true } } },
          },
        },
      });

      if (!userCart || userCart.totalAmount === 0) {
        throw new Error("Cart not found");
      }

      const order = await tx.order.create({
        data: {
          token: token,
          totalAmount: userCart.totalAmount,
          status: OrderStatus.PENDING,
          items: userCart.cartItems.map((item) => ({
            id: item.id,
            quantity: item.quantity,
            price: item.productVariant.price,
            color: item.productVariant.color,
            storage: item.productVariant.storage,
            product: {
              id: item.productVariant.product.id,
              name: item.productVariant.product.name,
            },
          })),
          fullName: `${data.firstName} ${data.lastName}`,
          email: data.email,
          phone: data.phone,
          address: data.address,
          deliveryTime: data.deliveryTime,
          comment: data.comment ?? null,
        },
      });

      await tx.cart.update({
        where: { token },
        data: {
          totalAmount: 0,
          cartItems: {
            deleteMany: {},
          },
        },
      });

      return order;
    });

    return { url: `/payment?orderId=${result.id}` };
  } catch {
    return { error: "Server error. Try again later." };
  }
}
