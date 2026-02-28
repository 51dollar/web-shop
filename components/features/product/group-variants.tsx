'use client';

import type { FC } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui';
import { cn } from '@/lib/utils';

type VariantItem = {
  name: string;
  value: string;
  disabled?: boolean;
}

interface Props {
  className?: string;
  items: readonly VariantItem[];
  defaultValue?: string;
  selectedValue?: string;
  onClick?: (value: VariantItem['value']) => void;
}

export const GroupVariants: FC<Props> = ({
  className,
  items,
  onClick,
  selectedValue
}) => {
  const groupedItems = items.reduce<VariantItem[][]>((acc, item, index) => {
    const groupIndex = Math.floor(index / 3);
    if (!acc[groupIndex]) acc[groupIndex] = [];
    acc[groupIndex].push(item);
    return acc;
  }, []);

  return (
    <Tabs value={selectedValue || "0"} className={className}>
      <div className="flex flex-col gap-2">
        {groupedItems.map((group, groupIndex) => (
          <TabsList
            key={groupIndex}
            className={cn(
              "grid grid-cols-3 gap-1 w-full inline-flex",
              "bg-white/80",
              "backdrop-blur-md",
              "border border-white/40",
              "shadow-sm shadow-black/5",
              "rounded-4xl p-1"
            )}
          >
            {group.map((item) => (
              <TabsTrigger
                key={item.value}
                value={item.value}
                onClick={() => onClick?.(item.value)}
                className={cn(
                  "flex items-center",
                  "h-7 px-2 rounded-4xl font-medium",
                  "transition-all duration-200",
                  "hover:bg-muted",
                  "data-[state=active]:bg-background",
                  "data-[state=active]:shadow-md",
                  "data-[state=active]:ring-1",
                  "data-[state=active]:ring-foreground/10 ",
                  "data-[state=active]:scale-[1.02]"
                )}
              >
                {item.name}
              </TabsTrigger>
            ))}
          </TabsList>
        ))}
      </div>
    </Tabs>
  );
};