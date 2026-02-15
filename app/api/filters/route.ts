import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const [priceAgg, storageValues, colorValues] = await Promise.all([
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
  ]);

  const [
    ramValues,
    osValues,
    processorValues,
    displaySizeValues,
    displayTypeValues,
    batteryAgg,
    releaseYearAgg,
  ] = await Promise.all([
    prisma.specifications.findMany({
      distinct: ["ram"],
      select: { ram: true },
    }),

    prisma.specifications.findMany({
      distinct: ["os"],
      select: { os: true },
    }),

    prisma.specifications.findMany({
      distinct: ["processor"],
      select: { processor: true },
    }),

    prisma.specifications.findMany({
      distinct: ["displaySize"],
      select: { displaySize: true },
    }),

    prisma.specifications.findMany({
      distinct: ["displayType"],
      select: { displayType: true },
    }),

    prisma.specifications.aggregate({
      _min: { battery: true },
      _max: { battery: true },
    }),

    prisma.specifications.aggregate({
      _min: { releaseYear: true },
      _max: { releaseYear: true },
    }),
  ]);

  return NextResponse.json({
    priceRange: {
      min: priceAgg._min.price ?? 0,
      max: priceAgg._max.price ?? 0,
    },

    storage: storageValues.map((s) => s.storage).sort((a, b) => a - b),

    colors: colorValues.map((c) => c.color).sort((a, b) => a.localeCompare(b)),

    specifications: {
      ram: ramValues.map((r) => r.ram).sort((a, b) => a - b),

      os: osValues.map((o) => o.os).sort((a, b) => a.localeCompare(b)),

      processor: processorValues
        .map((p) => p.processor)
        .sort((a, b) => a.localeCompare(b)),

      displaySize: displaySizeValues
        .map((d) => d.displaySize)
        .sort((a, b) => a - b),

      displayType: displayTypeValues
        .map((d) => d.displayType)
        .sort((a, b) => a.localeCompare(b)),

      batteryRange: {
        min: batteryAgg._min.battery ?? 0,
        max: batteryAgg._max.battery ?? 0,
      },

      releaseYearRange: {
        min: releaseYearAgg._min.releaseYear ?? 0,
        max: releaseYearAgg._max.releaseYear ?? 0,
      },
    },
  });
}
