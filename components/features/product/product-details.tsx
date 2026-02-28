import type { FC } from 'react';
import { Button, Title } from '@/components/ui';
import { Prisma } from '@/lib/generated/prisma-client';
import { GroupVariants } from '@/components/features/product/index';
import { cn } from '@/lib/utils';
import { HugeiconsIcon } from '@hugeicons/react';
import { ShoppingBasketDone01Icon } from '@hugeicons/core-free-icons';

type Variant = Prisma.ProductVariantGetPayload<{}>;
type Specifications = Prisma.SpecificationsGetPayload<{}> | null;

interface Props {
  className?: string;
  name: string;
  variants: Variant[];
  specifications: Specifications;
  selectedVariantId: string;
  currentPrice: number;
  onSelectVariant: (id: string) => void;
  onClickAdd?: VoidFunction;
}

export const ProductDetails: FC<Props> = ({
  className,
  name,
  variants,
  specifications,
  selectedVariantId,
  currentPrice,
  onSelectVariant,
  onClickAdd,
}) => {
  return (
    <div className={cn(
      "grid max-w-[500px] h-full",
      "grid-rows-[auto_auto_1fr_auto]",
      "gap-6",
      className
    )}>
      <div className="space-y-1">
        <Title
          text={name}
          size="md"
          className="font-semibold tracking-tight"
        />
      </div>

      <div className="space-y-2">
        <p className="font-semibold text-neutral-700">
          Choose configuration
        </p>

        <GroupVariants
          items={variants.map((variant) => ({
            name: `${variant.color} • ${variant.storage}GB`,
            value: variant.id.toString(),
          }))}
          selectedValue={selectedVariantId}
          onClick={onSelectVariant}
        />
      </div>

      {specifications && (
        <div className="space-y-3 overflow-auto pr-2">
          <p className="font-semibold text-neutral-700">
            Specifications
          </p>
          <div className="grid grid-cols-2 py-2 text-sm text-neutral-500">
            <p><b>Display Size:</b> {specifications.displaySize}</p>
            <p><b>Display Type:</b> {specifications.displayType}</p>

            <p><b>Resolution:</b> {specifications.resolution}</p>
            <p><b>Processor:</b> {specifications.processor}</p>

            <p><b>RAM:</b> {specifications.ram}GB</p>
            <p><b>Battery:</b> {specifications.battery}mAh</p>

            <p><b>Main Camera:</b> {specifications.mainCamera}</p>
            <p><b>Front Camera:</b> {specifications.frontCamera}</p>

            <p><b>OS:</b> {specifications.os}</p>
            <p><b>Release Year:</b> {specifications.releaseYear}</p>
          </div>
        </div>
      )}

      <div
        className="pt-3 border-t border-neutral-200
                flex items-center justify-between"
      >
                <span className="text-2xl font-semibold tracking-tight">
                    {currentPrice} р.
                </span>

        <Button
          size="lg"
          className="px-6"
          onClick={onClickAdd}
        >
          <HugeiconsIcon icon={ShoppingBasketDone01Icon} />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};