import type { OrderItemDto } from "@/app/types/order-item.dto";
import { EmailNotificationOrder } from "@/components/features/email-template/email-notification-order";
import { Resend } from "resend";

interface SendEmailProps {
  orderId: number;
  email: string;
  totalAmount: number;
  fullName: string;
  address: string;
  paymentMethod: string;
  items: OrderItemDto[];
}

export async function sendEmail(result: SendEmailProps) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error("❌ RESEND_API_KEY not found");
      return;
    }

    if (!process.env.RESEND_EMAIL) {
      console.error("❌ RESEND_EMAIL not found");
      return;
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: process.env.RESEND_EMAIL,
      to: result.email,
      subject: `Order #${result.orderId}`,
      react: EmailNotificationOrder({
        orderId: result.orderId,
        totalAmount: result.totalAmount,
        fullName: result.fullName,
        address: result.address,
        paymentMethod: result.paymentMethod,
        items: result.items,
      }),
    });
  } catch (error) {
    console.error("Failed to send email:", error);
  }
}
