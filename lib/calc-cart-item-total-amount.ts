import type { CartItemDto } from "@/services/dto/cart-dto";

export const calcCartItemTotalAmount = (item: CartItemDto): number => {
  return item.productVariant.price * item.quantity;
};
