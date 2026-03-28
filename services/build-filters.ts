import type { FiltersDTO } from "@/app/types";
import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

export const buildFilters = unstable_cache(
  async (): Promise<FiltersDTO> => {
    const [models, variants, specs] = await Promise.all([
      prisma.product.findMany({
        select: {
          id: true,
          name: true,
        },
        orderBy: {
          name: "asc",
        },
      }),

      prisma.productVariant.findMany({
        select: {
          color: true,
          storage: true,
          price: true,
        },
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

    const colors = [...new Set(variants.map((v) => v.color))];

    const storage = [...new Set(variants.map((v) => v.storage))];

    const prices = variants.map((v) => v.price);

    const ram = [...new Set(specs.map((v) => v.ram))];

    const os = [...new Set(specs.map((v) => v.os))];

    const processor = [...new Set(specs.map((v) => v.processor))];

    const displaySize = [...new Set(specs.map((v) => v.displaySize))];

    const displayType = [...new Set(specs.map((v) => v.displayType))];

    const battery = specs.map((v) => v.battery);
    const years = specs.map((v) => v.releaseYear);

    return {
      models,

      priceRange: {
        min: Math.min(...prices),
        max: Math.max(...prices),
      },

      storage,
      colors,

      specifications: {
        ram,
        os,
        processor,
        displaySize,
        displayType,

        batteryRange: {
          min: Math.min(...battery),
          max: Math.max(...battery),
        },

        releaseYearRange: {
          min: Math.min(...years),
          max: Math.max(...years),
        },
      },
    };
  },
  ["filters"],
  {
    revalidate: 3600,
  },
);
