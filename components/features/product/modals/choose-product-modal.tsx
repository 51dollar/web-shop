"use client";

import { type FC, useState } from 'react';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent } from '@/components/ui';
import { Prisma } from '@/lib/generated/prisma-client';
import { ProductDetails, ProductPreview } from '@/components/features/product';
import { useProductSelection } from '@/hooks';
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

export const ChooseProductModal: FC<Props> = ({
  className,
  product,
}) => {
  const {
    selectedVariantId,
    currentPrice,
    currentImage,
    selectVariant,
  } = useProductSelection(product.variants);

  const [isOpen, setIsOpen] = useState(true);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <DialogContent className={cn("p-0  bg-white overflow-hidden", className)}>
        <div className="p-6">
          <div className="flex">
            <div className="w-1/2 flex items-center justify-center p-6">
              <ProductPreview
                src={currentImage}
                alt={product.name}
                className="w-120 h-120"
              />
            </div>

            <div className="w-1/2 flex flex-col bg-gray-100/80 rounded-3xl m-6 p-6">
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
          <div className={cn("grid grid-flow-col mx-6 mb-6", className)}>
            <div className="bg-gray-100/80 rounded-3xl p-6">
              <DescriptionProduct description={product.description} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};