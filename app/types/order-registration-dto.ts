import type { DeliveryTime } from "@/lib/generated/prisma-client";

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface DeliveryInfo {
  address: string;
  deliveryTime: DeliveryTime;
  comment?: string;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  color: string;
  storage: number;
  disabled?: boolean;
}