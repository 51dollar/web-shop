import type { DeliveryInfo, PersonalInfo } from "@/app/types";
import { create } from "zustand";

interface CheckoutState {
  personalInfo: PersonalInfo | null;
  deliveryInfo: DeliveryInfo | null;
  setPersonalInfo: (data: PersonalInfo) => void;
  setDeliveryInfo: (data: DeliveryInfo) => void;
  clearCheckout: () => void;
}

export const useCheckoutStore = create<CheckoutState>((set) => ({
  personalInfo: null,
  deliveryInfo: null,
  setPersonalInfo: (data) => set({ personalInfo: data }),
  setDeliveryInfo: (data) => set({ deliveryInfo: data }),
  clearCheckout: () => set({ personalInfo: null, deliveryInfo: null }),
}));
