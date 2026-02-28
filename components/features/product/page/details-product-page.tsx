"use client";

import type { FC } from 'react';
import { Prisma } from '@/lib/generated/prisma-client';
import { ProductDetails, ProductPreview } from '@/components/features/product';
import { useProductSelection } from '@/hooks';
import { cn } from '@/lib/utils';
import { Container } from '@/components/ui';
import { DescriptionProduct } from '@/components/features/product/page/description-product';

type Product = Prisma.ProductGetPayload<{
  include: {
    variants: true;
    specifications: true;
  };
}>;

interface Props {
  product: Product;
  className?: string;
}

export const DetailsProductPage: FC<Props> = ({className, product}) => {
  const {
    selectedVariantId,
    currentPrice,
    currentImage,
    selectVariant,
  } = useProductSelection(product.variants);

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