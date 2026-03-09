import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const userId = 1;
    const token = request.cookies.get("cartToken")?.value;

    if (!token) {
      return NextResponse.json({ items: [] });
    }

    const userCart = await prisma.cart.findFirst({
      where: {
        OR: [{ userId }, { token }],
      },
      include: {
        cartItems: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            productVariant: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(userCart);
  } catch (error) {
    console.log(error);
  }
}
