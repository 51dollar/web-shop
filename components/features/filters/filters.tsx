"use client";

import { type FC } from "react";
import { cn } from "@/lib/utils";
import { CheckboxFiltersGroup, PriceRangeFilter } from ".";
import { Title } from "@/components/ui";
import { useFiltersData } from "@/hooks/useFiltersData";
import { useFiltersState } from "@/hooks/useFiltersState"

interface Props {
    className?: string;
}

const MIN = 0;
const MAX = 20000;

export const Filters: FC<Props> = ({ className }) => {
    const {
        filters,
        loading,
        modelItems,
        colorItems,
        storageItems,
        ramItems,
        osItems,
        processorItems,
        displayTypeItems,
        displaySizeItems,
    } = useFiltersData();

    const {
        prices,
        setPrices,
        selected,
        toggle,
    } = useFiltersState();

    return (
        <div className={cn(className)}>
            <Title text="Filters" size="sm" className="mb-5 font-bold" />

            <div className="mt-2 border-b border-neutral-100 py-2">
                <PriceRangeFilter
                    min={filters?.priceRange.min ?? MIN}
                    max={filters?.priceRange.max ?? MAX}
                    step={50}
                    loading={loading}
                    value={prices}
                    onChange={setPrices}
                />
            </div>

            <CheckboxFiltersGroup
                name="models"
                title="Models"
                items={modelItems}
                loading={loading}
                selectedIds={selected.models}
                onClickCheckbox={(id) => toggle("models", id)}
            />

            <CheckboxFiltersGroup
                name="color"
                title="Color"
                items={colorItems}
                loading={loading}
                selectedIds={selected.color}
                onClickCheckbox={(id) => toggle("color", id)}
            />

            <CheckboxFiltersGroup
                name="storage"
                title="Storage"
                items={storageItems}
                loading={loading}
                selectedIds={selected.storage}
                onClickCheckbox={(id) => toggle("storage", id)}
            />

            <CheckboxFiltersGroup
                name="ram"
                title="RAM"
                items={ramItems}
                loading={loading}
                selectedIds={selected.ram}
                onClickCheckbox={(id) => toggle("ram", id)}
            />

            <CheckboxFiltersGroup
                name="processor"
                title="Processor"
                items={processorItems}
                loading={loading}
                selectedIds={selected.processor}
                onClickCheckbox={(id) => toggle("processor", id)}
            />

            <CheckboxFiltersGroup
                name="displayType"
                title="Display Type"
                items={displayTypeItems}
                loading={loading}
                selectedIds={selected.displayType}
                onClickCheckbox={(id) => toggle("displayType", id)}
            />

            <CheckboxFiltersGroup
                name="displaySize"
                title="Display Size"
                items={displaySizeItems}
                loading={loading}
                selectedIds={selected.displaySize}
                onClickCheckbox={(id) => toggle("displaySize", id)}
            />

            <CheckboxFiltersGroup
                name="os"
                title="OS"
                items={osItems}
                loading={loading}
                selectedIds={selected.os}
                onClickCheckbox={(id) => toggle("os", id)}
            />
        </div>
    );
};
