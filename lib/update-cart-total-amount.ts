import { calcCartItemTotalAmount } from "./calc-cart-item-total-amount";
import { prisma } from "./prisma";

export const updateCartTotalAmount = async (token: string) => {
  const userCart = await prisma.cart.findFirst({
    where: {
      token,
    },
    include: {
      cartItems: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          productVariant: {
            include: {
              product: true,
            },
          },
        },
      },
    },
  });

  if (!userCart) return null;

  const totalAmount = userCart.cartItems.reduce(
    (acc, item) => acc + calcCartItemTotalAmount(item),
    0,
  );

  return await prisma.cart.update({
    where: {
      id: userCart.id,
    },
    data: {
      totalAmount,
    },
    include: {
      cartItems: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          productVariant: {
            include: {
              product: true,
            },
          },
        },
      },
    },
  });
};
