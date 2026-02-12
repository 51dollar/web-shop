"use client";

import { type FC } from 'react';
import { cn } from '@/lib/utils';
import { CheckboxFiltersGroup, FilterCheckbox, PriceRangeFilter } from '.';
import { Title } from '@/components/ui';
import { useFilterModels } from '@/hooks/useFilterModels';

interface Props {
    className?: string;
}

export const Filters: FC<Props> = ({ className }) => {
    const { filterItems, loading, onAddId, selectedIds } = useFilterModels();

    return (
        <div className={cn('', className)}>
            <Title text="Filters" size="sm" className="mb-5 font-bold" />

            <div className="flex flex-col gap-2">
                <p className="font-bold mb-1">Condition</p>
                <FilterCheckbox name="condition" text="New" value="1" />
                <FilterCheckbox name="condition" text="Used" value="2" />
            </div>

            <div className="mt-2 border-y border-y-neural-100 py-2 pb-2">
                <PriceRangeFilter />
            </div>

            <div>
                <CheckboxFiltersGroup
                    className="mt-2"
                    name="models"
                    title="Models"
                    limit={6}
                    defaultItems={filterItems}
                    items={filterItems}
                    loading={loading}
                    onClickCheckbox={onAddId}
                    selectedIds={selectedIds}
                />
            </div>
        </div>
    );
};