import { getCartDetails, type CartStateItem } from "@/lib/get-cart-details";
import { Api } from "@/services/api-client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartState {
  loading: boolean;
  error: boolean;
  totalAmount: number;
  items: CartStateItem[];
  getCartItems: () => Promise<void>;
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;
  addCartItem: (values: any) => Promise<void>;
  removeCartItem: (id: number) => Promise<void>;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      error: false,
      loading: true,
      totalAmount: 0,

      getCartItems: async () => {
        try {
          set({ loading: true, error: false });
          const data = await Api.cart.getCart();
          set(getCartDetails(data));
        } catch (error) {
          console.log(error);
          set({ error: true });
        } finally {
          set({ loading: false });
        }
      },

      updateItemQuantity: async (id: number, quantity: number) => {
        try {
          set({ loading: true, error: false });
          const data = await Api.cart.updateCartItem(id, quantity);
          set(getCartDetails(data));
        } catch (error) {
          console.log(error);
          set({ error: true });
        } finally {
          set({ loading: false });
        }
      },

      removeCartItem: async (id: number) => {
        try {
          set({ loading: true, error: false });
          const data = await Api.cart.removeCartItem(id);
          set(getCartDetails(data));
        } catch (error) {
          console.log(error);
          set({ error: true });
        } finally {
          set({ loading: false });
        }
      },

      addCartItem: async (value: any) => {},
    }),
    { name: "cart-storage" },
  ),
);
