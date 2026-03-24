import { findOrCreateCart } from "@/lib/find-or-create-cart";
import { prisma } from "@/lib/prisma";
import { updateCartTotalAmount } from "@/lib/update-cart-total-amount";
import type { CreateCartItemValues } from "@/services/dto/cart-dto";
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

    return NextResponse.json(userCart || { items: [] });
  } catch (error) {
    console.log("[CART_GET] Server Error", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    let token = request.cookies.get("cartToken")?.value;

    if (!token) {
      token = crypto.randomUUID();
    }

    const userCart = await findOrCreateCart(token);
    const data = (await request.json()) as CreateCartItemValues;

    const foundCart = await prisma.cartItem.findFirst({
      where: {
        cartId: userCart.id,
        productVariantId: data.variantId,
      },
    });

    if (foundCart) {
      await prisma.cartItem.update({
        where: { id: foundCart.id },
        data: {
          quantity: foundCart.quantity + 1,
        },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          quantity: 1,
          productVariantId: data.variantId,
        },
      });
    }

    const updatedCart = await updateCartTotalAmount(token);

    const response = NextResponse.json(updatedCart);
    response.cookies.set("cartToken", token, {
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return response;
  } catch (error) {
    console.log("[CART_POST] Server Error", error);
    return NextResponse.json(
      { message: "Failed to create cart!" },
      { status: 500 },
    );
  }
}
