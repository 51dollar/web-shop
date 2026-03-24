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

export interface CreateCartItemValues {
  productId: number;
  variantId: number;
}
