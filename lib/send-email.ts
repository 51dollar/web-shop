import { EmailNotificationOrder } from "@/components/features/email-template/email-notification-order";
import type { OrderWithItems } from "@/components/features/email-template/type";
import { Resend } from "resend";

export async function sendEmail(result: OrderWithItems) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    if (!process.env.RESEND_API_KEY) {
      console.error("❌ RESEND_API_KEY not found");
      return;
    }
    if (!process.env.RESEND_EMAIL) {
      console.error("❌ RESEND_EMAIL not found");
      return;
    }

    await resend.emails.send({
      from: process.env.RESEND_EMAIL,
      to: result.email,
      subject: `Order #${result.id}`,
      react: EmailNotificationOrder({
        orderId: result.id,
        items: result.items.map((item) => ({
          id: item.id,
          quantity: item.quantity,
          price: item.price,
          color: item.color,
          storage: item.storage,
          product: {
            id: item.product.id,
            name: item.product.name,
          },
        })),
        totalAmount: result.totalAmount,
        fullName: result.fullName,
        address: result.address,
        paymentMethod: "Card",
      }),
    });
  } catch (error) {
    console.error("Failed to send email:", error);
  }
}
