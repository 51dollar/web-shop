import { Prisma } from "@/lib/generated/prisma-client";

export type ProductDto = Prisma.ProductGetPayload<{
  include: {
    variants: true;
    specifications: true;
  };
}>;

export type Variant = Prisma.ProductVariantGetPayload<{}>;
export type Specifications = Prisma.SpecificationsGetPayload<{}> | null;
