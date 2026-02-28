"use client";

import { type FC, useMemo } from "react";
import { cn } from "@/lib/utils";
import { CheckboxFiltersGroup, PriceRangeFilter } from ".";
import { Title } from "@/components/ui";
import { useFiltersState, useFiltersUrlSync } from "@/hooks";
import type { FiltersDTO } from "@/app/types";
import { mapFiltersToUI } from "./filters-mapper";

interface Props {
    className?: string;
    initialData: FiltersDTO;
}

export const Filters: FC<Props> = ({className, initialData}) => {
    const uiFilters = useMemo(() =>
            mapFiltersToUI(initialData),
        [initialData]
    );

    const {prices, setPrices, selected, toggle} = useFiltersState();

    useFiltersUrlSync(prices, selected);

    const filterConfig = [
        {key: "models", title: "Models", items: uiFilters.modelItems},
        {key: "color", title: "Color", items: uiFilters.colorItems},
        {key: "storage", title: "Storage", items: uiFilters.storageItems},
        {key: "ram", title: "RAM", items: uiFilters.ramItems},
        {key: "processor", title: "Processor", items: uiFilters.processorItems},
        {key: "displayType", title: "Display Type", items: uiFilters.displayTypeItems},
        {key: "displaySize", title: "Display Size", items: uiFilters.displaySizeItems},
        {key: "os", title: "OS", items: uiFilters.osItems},
    ] as const;

    return (
        <div className={cn(className)}>
            <Title text="Filters" size="sm" className="mb-5 font-bold" />

            <div className="mt-2 border-b border-neutral-100 py-2">
                <PriceRangeFilter
                    min={initialData.priceRange.min}
                    max={initialData.priceRange.max}
                    step={50}
                    value={prices}
                    onChange={setPrices}
                />
            </div>

            {filterConfig.map(({key, title, items}) => (
                <CheckboxFiltersGroup
                    key={key}
                    name={key}
                    title={title}
                    items={items}
                    selectedIds={selected[key]}
                    onClickCheckbox={(id) => toggle(key, id)}
                    className="mt-2"
                />
            ))}
        </div>
    );
};
