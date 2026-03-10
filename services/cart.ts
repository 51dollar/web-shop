import { api } from "./axios";
import { ApiRoutes } from "./constants";
import type { CartDto } from "./dto/cart-dto";

export const getCart = async (): Promise<CartDto> => {
  const { data } = await api.get<CartDto>(ApiRoutes.CART);
  return data;
};

export const updateCartItem = async (
  itemId: number,
  quantity: number,
): Promise<CartDto> => {
  const { data } = await api.patch<CartDto>(ApiRoutes.CART + `/${itemId}`, {
    quantity,
  });
  return data;
};

export const removeCartItem = async (itemId: number): Promise<CartDto> => {
  const { data } = await api.delete<CartDto>(ApiRoutes.CART + `/${itemId}`);
  return data;
};
