import { PRICE_RANGE } from "@/app/types/price";
import { prisma } from "./prisma";
import { cache } from "react";

export interface GetSearchParams {
  price?: string;
  models?: string;
  color?: string;
  storage?: string;
  ram?: string;
  os?: string;
  processor?: string;
  displayType?: string;
  displaySize?: string;
}

const parseNumberArray = (value?: string) =>
  value
    ?.split("-")
    .map(Number)
    .filter((v) => !isNaN(v)) ?? [];

const parseStringArray = (value?: string) =>
  value?.split("-").filter(Boolean) ?? [];

const parsePrice = (value?: string) => {
  if (!value) {
    return {
      min: PRICE_RANGE.min,
      max: PRICE_RANGE.max,
    };
  }

  const [min, max] = value.split("-").map(Number);

  return {
    min: min !== undefined && !isNaN(min) ? min : PRICE_RANGE.min,
    max: max !== undefined && !isNaN(max) ? max : PRICE_RANGE.max,
  };
};

export const getCategoriesWithFilters = cache(
  async (searchParams?: GetSearchParams) => {
    const models = parseNumberArray(searchParams?.models);
    const color = parseStringArray(searchParams?.color);
    const storage = parseNumberArray(searchParams?.storage);
    const ram = parseNumberArray(searchParams?.ram);
    const os = parseStringArray(searchParams?.os);
    const processor = parseStringArray(searchParams?.processor);
    const displayType = parseStringArray(searchParams?.displayType);
    const displaySize = parseNumberArray(searchParams?.displaySize);

    const price = parsePrice(searchParams?.price);

    return prisma.category.findMany({
      include: {
        products: {
          orderBy: {
            id: "asc",
          },

          where: {
            ...(models.length && {
              id: { in: models },
            }),

            variants: {
              some: {
                price: {
                  gte: price.min,
                  lte: price.max,
                },

                ...(color.length && {
                  color: { in: color },
                }),

                ...(storage.length && {
                  storage: { in: storage },
                }),
              },
            },

            specifications: {
              ...(ram.length && {
                ram: { in: ram },
              }),

              ...(os.length && {
                os: { in: os },
              }),

              ...(processor.length && {
                processor: { in: processor },
              }),

              ...(displayType.length && {
                displayType: { in: displayType },
              }),

              ...(displaySize.length && {
                displaySize: { in: displaySize },
              }),
            },
          },

          include: {
            variants: {
              select: {
                id: true,
                price: true,
                color: true,
                storage: true,
                imageUrl: true,
              },
            },

            specifications: {
              select: {
                ram: true,
                processor: true,
                os: true,
                displayType: true,
                displaySize: true,
              },
            },
          },
        },
      },
    });
  },
);
