import type { FiltersDTO } from "@/app/types";
import type { Category, Product, ProductVariant, Specifications } from "@/lib/generated/prisma-client/client";

type CategoryWithProducts = Category & {
  products: (Product & {
    variants: ProductVariant[];
    specifications: Specifications | null;
  })[];
};

export function buildFilters(
  categories: CategoryWithProducts[],
): FiltersDTO {
  const products = categories.flatMap((c) => c.products);

  const variants = products.flatMap((p) => p.variants);
  const specs = products
    .map((p) => p.specifications)
    .filter(Boolean) as Specifications[];

  const unique = <T>(arr: T[]) => [...new Set(arr)];

  const prices = variants.map((v) => v.price);

  return {
    models: products.map((p) => ({ id: p.id, name: p.name })),

    priceRange: {
      min: Math.min(...prices),
      max: Math.max(...prices),
    },

    storage: unique(variants.map((v) => v.storage)).sort((a, b) => a - b),

    colors: unique(variants.map((v) => v.color)).sort(),

    specifications: {
      ram: unique(specs.map((s) => s.ram)).sort((a, b) => a - b),
      os: unique(specs.map((s) => s.os)).sort(),
      processor: unique(specs.map((s) => s.processor)).sort(),
      displaySize: unique(specs.map((s) => s.displaySize)).sort(
        (a, b) => a - b,
      ),
      displayType: unique(specs.map((s) => s.displayType)).sort(),

      batteryRange: {
        min: Math.min(...specs.map((s) => s.battery)),
        max: Math.max(...specs.map((s) => s.battery)),
      },

      releaseYearRange: {
        min: Math.min(...specs.map((s) => s.releaseYear)),
        max: Math.max(...specs.map((s) => s.releaseYear)),
      },
    },
  };
}
