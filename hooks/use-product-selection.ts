import { useMemo, useState } from "react";
import type { Prisma } from "@/lib/generated/prisma-client";

type Variant = Prisma.ProductVariantGetPayload<{}>;

export const useProductSelection = (variants: Variant[]) => {
  const [selectedVariantId, setSelectedVariantId] = useState<string>(() =>
    variants[0]?.id.toString() ?? ""
  );

  const selectedVariant = useMemo(() => {
    return variants.find(
      (v) => v.id.toString() === selectedVariantId
    ) ?? variants[0];
  }, [variants, selectedVariantId]);

  const selectVariant = (id: string) => {
    setSelectedVariantId(id);
  };

  return {
    selectedVariantId,
    selectedVariant,
    selectVariant,
    currentPrice: selectedVariant?.price ?? 0,
    currentImage: selectedVariant?.imageUrl ?? "/logo.png",
  };
};