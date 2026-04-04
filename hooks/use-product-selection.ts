import type { Variant } from "@/app/types";
import { useCallback, useMemo, useState } from "react";

export const useProductSelection = (variants: Variant[]) => {
  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    () => variants[0]?.id.toString() ?? "",
  );

  const selectedVariant = useMemo(() => {
    return (
      variants.find((v) => v.id.toString() === selectedVariantId) ?? variants[0]
    );
  }, [variants, selectedVariantId]);

  const selectVariant = useCallback((id: string) => {
    setSelectedVariantId(id);
  }, []);

  return {
    selectedVariantId,
    selectedVariant,
    selectVariant,
    currentPrice: selectedVariant?.price ?? 0,
    currentImage: selectedVariant?.imageUrl ?? "/logo.png",
  };
};
