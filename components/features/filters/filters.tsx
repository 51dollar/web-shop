"use client";

import { useEffect, useState, type FC } from 'react';
import { cn } from '@/lib/utils';
import { CheckboxFiltersGroup, PriceRangeFilter } from '.';
import { Title } from '@/components/ui';
import { useFilterModels } from '@/hooks/useFilterModels';
import { useFilterSpecifications } from '@/hooks/useFilterSpecifications';

interface Props {
    className?: string;
}

export const Filters: FC<Props> = ({ className }) => {
    const { filterModelItems, loadingModels, onAddId, selectedIds } = useFilterModels();
    const {
        filters,
        loading,
        colorItems,
        storageItems,
        ramItems,
        processorItems,
        displayTypeItems,
        displaySizeItems,
        osItems
    } = useFilterSpecifications();

    const [selected, setSelected] = useState<Record<string, Set<string>>>({});

    const toggle = (group: string, value: string) => {
        setSelected((prev) => {
            const current = new Set(prev[group] ?? []);

            if (current.has(value)) {
                current.delete(value);
            } else {
                current.add(value);
            }

            return {
                ...prev,
                [group]: current,
            };
        });
    };

    const buildQuery = () => ({
        color: Array.from(selected.color ?? []),
        storage: Array.from(selected.storage ?? []),
        ram: Array.from(selected.ram ?? []),
        os: Array.from(selected.os ?? []),
        processor: Array.from(selected.processor ?? []),
        displayType: Array.from(selected.displayType ?? []),
        displaySize: Array.from(selected.displaySize ?? []),
    });

    useEffect(() => {
        console.log("QUERY:", buildQuery());
    }, [selected]);

    return (
        <div className={cn('', className)}>
            <Title text="Filters" size="sm" className="mb-5 font-bold" />

            <div className="mt-2 border-b border-b-neutral-100 py-2">
                <PriceRangeFilter
                    min={filters?.priceRange.min ?? 0}
                    max={filters?.priceRange.max ?? 20000}
                    step={50}
                    loading={loading}
                />
            </div>

            <div>
                <CheckboxFiltersGroup
                    className="mt-2"
                    name="models"
                    title="Models"
                    limit={6}
                    defaultItems={filterModelItems}
                    items={filterModelItems}
                    loading={loadingModels}
                    onClickCheckbox={onAddId}
                    selectedIds={selectedIds}
                />

                <CheckboxFiltersGroup
                    className="mt-2 border-y border-neutral-100 py-2"
                    name="color"
                    title="Color"
                    limit={3}
                    items={colorItems}
                    loading={loading}
                    selectedIds={selected["color"] ?? new Set()}
                    onClickCheckbox={(id) => toggle("color", id)}
                />

                <CheckboxFiltersGroup
                    className="mt-2"
                    name="storage"
                    title="Storage"
                    limit={3}
                    items={storageItems}
                    loading={loading}
                    selectedIds={selected["storage"] ?? new Set()}
                    onClickCheckbox={(id) => toggle("storage", id)}
                />

                <CheckboxFiltersGroup
                    className="mt-2 border-y border-neutral-100 py-2"
                    name="ram"
                    title="RAM"
                    limit={3}
                    items={ramItems}
                    loading={loading}
                    selectedIds={selected["ram"] ?? new Set()}
                    onClickCheckbox={(id) => toggle("ram", id)}
                />

                <CheckboxFiltersGroup
                    className="mt-2"
                    name="processor"
                    title="Processor"
                    limit={3}
                    items={processorItems}
                    loading={loading}
                    selectedIds={selected["processor"] ?? new Set()}
                    onClickCheckbox={(id) => toggle("processor", id)}
                />

                <CheckboxFiltersGroup
                    className="mt-2 border-y border-neutral-100 py-2"
                    name="displayType"
                    title="Display Type"
                    limit={3}
                    items={displayTypeItems}
                    loading={loading}
                    selectedIds={selected["displayType"] ?? new Set()}
                    onClickCheckbox={(id) => toggle("displayType", id)}
                />

                <CheckboxFiltersGroup
                    className="mt-2"
                    name="displaySize"
                    title="Display Size"
                    limit={3}
                    items={displaySizeItems}
                    loading={loading}
                    selectedIds={selected["displaySize"] ?? new Set()}
                    onClickCheckbox={(id) => toggle("displaySize", id)}
                />

                <CheckboxFiltersGroup
                    className="mt-2 border-t border-neutral-100 py-2"
                    name="os"
                    title="OS"
                    limit={2}
                    items={osItems}
                    loading={loading}
                    selectedIds={selected["os"] ?? new Set()}
                    onClickCheckbox={(id) => toggle("os", id)}
                />
            </div>
        </div>
    );
};