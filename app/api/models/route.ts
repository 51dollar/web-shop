import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const models = await prisma.product.findMany({
    select: { id: true, name: true },
  });

  return NextResponse.json(models);
}
