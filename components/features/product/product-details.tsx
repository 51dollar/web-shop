import type { FC } from 'react';
import { memo, useMemo } from 'react';
import { Button, Title } from '@/components/ui';
import { GroupVariants, ProductSpecifications } from '@/components/features/product/index';
import { cn } from '@/lib/utils';
import { HugeiconsIcon } from '@hugeicons/react';
import { ShoppingBasketDone01Icon } from '@hugeicons/core-free-icons';
import type { Specifications, Variant } from '@/app/types';

interface Props {
  className?: string;
  name: string;
  variants: Variant[];
  specifications: Specifications;
  selectedVariantId: string;
  currentPrice: number;
  onSelectVariant: (id: string) => void;
  onClickAdd?: () => void;
  loading?: boolean;
}

export const ProductDetails: FC<Props> = memo(({
  className,
  name,
  variants,
  specifications,
  selectedVariantId,
  currentPrice,
  onSelectVariant,
  onClickAdd,
  loading,
}) => {
  const groupVariantsItems = useMemo(
    () => variants.map((variant) => ({
      name: `${variant.color} • ${variant.storage}GB`,
      value: variant.id.toString(),
    })),
    [variants]
  );

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
          items={groupVariantsItems}
          selectedValue={selectedVariantId}
          onClick={onSelectVariant}
        />
      </div>

      {specifications && <ProductSpecifications specifications={specifications} />}

      <div className="pt-3 border-t border-neutral-200 flex items-center justify-between">
        <span className="text-2xl font-semibold tracking-tight">
          {currentPrice} Br
        </span>

        <Button
          size="lg"
          className="px-6"
          onClick={onClickAdd}
          disabled={loading || !selectedVariantId}
          loading={loading || false}
          loadingText="Adding..."
        >
          <HugeiconsIcon icon={ShoppingBasketDone01Icon} />
          Add to Cart
        </Button>
      </div>
    </div>
  );
});

ProductDetails.displayName = 'ProductDetails';