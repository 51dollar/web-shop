import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart";
import { useProductSelection } from "./use-product-selection";
import toast from "react-hot-toast";
import type { ProductDto } from "@/app/types";
import { useCallback } from "react";

export const useProductView = (product: ProductDto) => {
  const { selectedVariantId, currentPrice, currentImage, selectVariant } =
    useProductSelection(product.variants);

  const router = useRouter();
  const addCartItem = useCartStore((state) => state.addCartItem);
  const loading = useCartStore((state) => state.loading);

  const onAddProduct = useCallback(
    async (shouldGoBack = false) => {
      if (!selectedVariantId) return;

      try {
        await addCartItem({
          productId: product.id,
          variantId: Number(selectedVariantId),
        });

        toast.success("Product added to cart");

        if (shouldGoBack) {
          router.back();
        }
      } catch {
        toast.error("Failed to add product to cart");
      }
    },
    [selectedVariantId, addCartItem, product.id, router],
  );

  return {
    selectedVariantId,
    currentPrice,
    currentImage,
    selectVariant,
    onAddProduct,
    loading,
  };
};
