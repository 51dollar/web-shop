import type {
  Cart,
  CartItem,
  Product,
  ProductVariant,
} from "@/lib/generated/prisma-client";

export type CartItemDto = CartItem & {
  productVariant: ProductVariant & {
    product: Product;
  };
};

export interface CartDto extends Cart {
  cartItems: CartItemDto[];
}
