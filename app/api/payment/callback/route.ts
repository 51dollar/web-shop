import type { OrderItemDto } from "@/app/types/order-item.dto";
import type { PaymentCallbackData } from "@/app/types/yookassa";
import { OrderStatus } from "@/lib/generated/prisma-client";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/send-email";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as PaymentCallbackData;
    console.log(body);

    const order = await prisma.order.findFirst({
      where: {
        id: Number(body.object.metadata.orderId),
      },
    });

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    const isSuccess = body.object.status === "succeeded";

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: isSuccess ? OrderStatus.SUCCEEDED : OrderStatus.CANCELLED,
      },
    });

    if (isSuccess) {
      console.log(order);
      const items = order?.items as unknown as OrderItemDto[];

      await sendEmail({
        orderId: order.id,
        totalAmount: order.totalAmount,
        fullName: order.fullName,
        address: order.address,
        email: order.email,
        paymentMethod: "Card",
        items,
      });

      return NextResponse.json(
        { message: "YooKassa callback received" },
        { status: 200 },
      );
    } else {
      return NextResponse.json(
        { message: "Payment failed, order cancelled" },
        { status: 404 },
      );
    }
  } catch (error) {
    console.log("[Payment callback] ", error);
    return NextResponse.json(
      { message: "YooKassa callback error" },
      { status: 500 },
    );
  }
}
