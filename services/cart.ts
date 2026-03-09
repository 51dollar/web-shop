import { api } from "./axios";
import { ApiRoutes } from "./constants";
import type { CartDto } from "./dto/cart-dto";

export const fetchCartItems = async (): Promise<CartDto> => {
  const { data } = await api.get<CartDto>(ApiRoutes.CART);
  return data;
};

 
