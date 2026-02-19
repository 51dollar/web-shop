import { prisma } from "@/lib/prisma";

export async function getCategoriesWithProducts() {
  return prisma.category.findMany({
    include: {
      products: {
        include: {
          variants: true,
          specifications: true,
        },
      },
    },
  });
}
