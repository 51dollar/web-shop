"use client";

import type { FC } from 'react';
import { ProductDetails, ProductPreview } from '@/components/features/product';
import { cn } from '@/lib/utils';
import { Container } from '@/components/ui';
import { DescriptionProduct } from '@/components/features/product/page/description-product';
import { useProductView } from '@/hooks/useProductView';
import type { ProductDto } from '@/app/types';

interface Props {
  product: ProductDto;
  className?: string;
}

export const DetailsProductPage: FC<Props> = ({ className, product }) => {
  const {
    currentImage,
    currentPrice,
    selectedVariantId,
    selectVariant,
    onAddProduct,
    loading,
  } = useProductView(product);

  return (
    <Container>
      <div className={cn("grid grid-cols-2 gap-2 items-center", className)}>
        <div className="flex justify-center p-6">
          <ProductPreview
            src={currentImage}
            alt={product.name}
            className="w-120 h-120"
          />
        </div>

        <div className="bg-gray-100/80 rounded-3xl m-12 p-6">
          <ProductDetails
            name={product.name}
            variants={product.variants}
            specifications={product.specifications}
            selectedVariantId={selectedVariantId}
            currentPrice={currentPrice}
            onSelectVariant={selectVariant}
            onClickAdd={onAddProduct}
            loading={loading}
          />
        </div>
      </div>

      <div className={cn("grid grid-flow-col mx-12", className)}>
        <div className="bg-gray-100/80 rounded-3xl p-6">
          <DescriptionProduct description={product.description} />
        </div>
      </div>
    </Container>
  );
};