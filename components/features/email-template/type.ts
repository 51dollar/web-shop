import type { Order } from "@/lib/generated/prisma-client/client";

export type OrderWithItems = Order & {
  items: OrderItem[];
};

export interface OrderItem {
  id: number;
  quantity: number;
  price: number;
  color: string;
  storage: number;
  product: {
    id: number;
    name: string;
  };
}

export interface EmailTemplateProps {
  orderId: number;
  items: OrderItem[];
  totalAmount: number;
  fullName: string;
  address: string;
  paymentMethod: string;
}
