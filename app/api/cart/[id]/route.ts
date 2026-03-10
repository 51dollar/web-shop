import { prisma } from "@/lib/prisma";
import { updateCartTotalAmount } from "@/lib/update-cart-total-amount";
import { NextResponse, NextRequest } from "next/server";

export const PATCH = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  try {
    const { id } = await params;
    const cartItemId = Number(id);
    const body = (await request.json()) as { quantity: number };
    const token = request.cookies.get("cartToken")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: cartItemId,
      },
    });

    if (!cartItem) {
      return NextResponse.json(
        { error: "Cart item is not found" },
        { status: 404 },
      );
    }

    if (body.quantity < 1) {
      return NextResponse.json(
        { error: "Quantity must be at least 1" },
        { status: 400 },
      );
    }

    if (cartItem.quantity === body.quantity) {
      const currentCart = await updateCartTotalAmount(token);
      return NextResponse.json(currentCart, { status: 200 });
    }

    await prisma.cartItem.update({
      where: {
        id: cartItemId,
      },
      data: {
        quantity: body.quantity,
      },
    });

    const updateUserCart = await updateCartTotalAmount(token);
    return NextResponse.json(updateUserCart, { status: 200 });
  } catch (error) {
    console.log("[CART_PATCH] Server Error", error);
    return NextResponse.json(
      { error: "Don't manage to update cart" },
      { status: 500 },
    );
  }
};

export const DELETE = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  try {
    const { id } = await params;
    const cartItemId = Number(id);
    const token = request.cookies.get("cartToken")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: cartItemId,
      },
    });

    if (!cartItem) {
      return NextResponse.json(
        { error: "Cart item is not found" },
        { status: 404 },
      );
    }

    await prisma.cartItem.delete({
      where: {
        id: cartItemId,
      },
    });

    const updateUserCart = await updateCartTotalAmount(token);
    return NextResponse.json(updateUserCart, { status: 200 });
  } catch (error) {
    console.log("[CART_DELETE] Server Error", error);
    return NextResponse.json(
      { error: "Don't manage to delete cart" },
      { status: 500 },
    );
  }
};
