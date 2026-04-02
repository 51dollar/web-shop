import type { CartDto } from "@/services/dto/cart-dto";
import { calcCartItemTotalAmount } from "./calc-cart-item-total-amount";

export interface CartStateItem {
  id: number;
  name: string;
  quantity: number;
  color: string;
  storage: number;
  price: number;
  imageUrl: string;
  disabled?: boolean;
}

interface CartDetails {
  items: CartStateItem[];
  totalAmount: number;
}

export const getCartDetails = (data: CartDto): CartDetails => {
  const items = (data?.cartItems || []).map((item) => ({
    id: item.id,
    quantity: item.quantity,
    name: item.productVariant.product.name,
    color: item.productVariant.color,
    storage: item.productVariant.storage,
    price: calcCartItemTotalAmount(item),
    imageUrl: item.productVariant.product.imageUrl,
    disabled: false,
  })) as CartStateItem[];

  return {
    items,
    totalAmount: data?.totalAmount || 0,
  };
};
