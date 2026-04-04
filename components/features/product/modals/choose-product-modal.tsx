"use client";

import { type FC } from 'react';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent } from '@/components/ui';
import { ProductDetails, ProductPreview } from '@/components/features/product';
import { useCleanUrl, useProductView } from '@/hooks';
import { DescriptionProduct } from '@/components/features/product/page/description-product';
import type { ProductDto } from '@/app/types';


interface Props {
  product: ProductDto;
  className?: string;
}

export const ChooseProductModal: FC<Props> = ({
  className,
  product,
}) => {
  const {
    currentImage,
    currentPrice,
    selectedVariantId,
    selectVariant,
    onAddProduct,
    loading,
  } = useProductView(product);

  const { isOpen, handleOpenChange } = useCleanUrl();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={handleOpenChange}
    >
      <DialogContent
        className={cn("p-0  bg-white overflow-hidden", className)}
      >
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
                onClickAdd={() => onAddProduct(true)}
                loading={loading}
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