import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const [priceAgg, storageValues, colorValues, models, specifications] =
    await Promise.all([
      prisma.productVariant.aggregate({
        _min: { price: true },
        _max: { price: true },
      }),

      prisma.productVariant.findMany({
        distinct: ["storage"],
        select: { storage: true },
      }),

      prisma.productVariant.findMany({
        distinct: ["color"],
        select: { color: true },
      }),

      prisma.product.findMany({
        select: { id: true, name: true },
        orderBy: { name: "asc" },
      }),

      prisma.specifications.findMany({
        select: {
          ram: true,
          os: true,
          processor: true,
          displaySize: true,
          displayType: true,
          battery: true,
          releaseYear: true,
        },
      }),
    ]);

  const unique = <T>(arr: T[]) => [...new Set(arr)];

  return NextResponse.json({
    models,

    priceRange: {
      min: priceAgg._min.price ?? 0,
      max: priceAgg._max.price ?? 0,
    },

    storage: unique(storageValues.map((s) => s.storage)).sort((a, b) => a - b),

    colors: unique(colorValues.map((c) => c.color)).sort(),

    specifications: {
      ram: unique(specifications.map((s) => s.ram)).sort((a, b) => a - b),
      os: unique(specifications.map((s) => s.os)).sort(),
      processor: unique(specifications.map((s) => s.processor)).sort(),
      displaySize: unique(specifications.map((s) => s.displaySize)).sort(
        (a, b) => a - b,
      ),
      displayType: unique(specifications.map((s) => s.displayType)).sort(),

      batteryRange: {
        min: Math.min(...specifications.map((s) => s.battery)),
        max: Math.max(...specifications.map((s) => s.battery)),
      },

      releaseYearRange: {
        min: Math.min(...specifications.map((s) => s.releaseYear)),
        max: Math.max(...specifications.map((s) => s.releaseYear)),
      },
    },
  });
}
