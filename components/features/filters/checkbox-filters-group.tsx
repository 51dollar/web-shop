"use client"

import type { FilterCheckboxProps } from "@/app/types";
import { Input, Skeleton } from "../../ui";
import { FilterCheckbox } from ".";
import { useState, type ChangeEvent, type FC } from "react";
import { cn } from "@/lib/utils";

type Item = FilterCheckboxProps;

interface Props {
    title: string;
    items: Item[];
    defaultItems?: Item[];
    limit?: number;
    loading?: boolean;
    searchInputPlaceholder?: string;
    onClickCheckbox?: (id: string) => void;
    defaultValue?: string[];
    selectedIds?: Set<string>;
    name?: string;
    className?: string;
}

export const CheckboxFiltersGroup: FC<Props> = ({
    title,
    items,
    defaultItems,
    limit = 5,
    loading,
    searchInputPlaceholder = 'Search...',
    onClickCheckbox,
    defaultValue,
    selectedIds,
    name,
    className,
}) => {
    const [showAll, setShowAll] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const onChangeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    }

    if (loading) {
        return (
            <div className={className}>
                <p className="font-bold mb-2">{title}</p>

                {
                    ...Array(limit).fill(0).map((_, index) => (
                        <Skeleton key={index} className="h-4 mb-2" />
                    ))
                }
                <Skeleton className="w-28 h-4 mb-2" />
            </div>
        )
    }

    const list = showAll
        ? items.filter((item) => item.text.toLowerCase().includes(searchValue.toLowerCase()))
        : (defaultItems || items).slice(0, limit);

    return <div className={className}>
        <p className="font-bold mb-2">{title}</p>

        {showAll && (
            <div className="mb-2">
                <Input
                    onChange={onChangeSearchInput}
                    placeholder={searchInputPlaceholder}
                    className="bg-gray-50 border-none"
                />
            </div>
        )}

        <div
            className={cn(
                "flex flex-col gap-3 pr-2",
                showAll && "max-h-60 overflow-auto scrollbar"
            )}
        >
            {list.map((item, index) => (
                <FilterCheckbox
                    key={index}
                    text={item.text}
                    value={item.value}
                    endAdornment={item.endAdornment}
                    checked={selectedIds?.has(item.value) ?? false}
                    onCheckedChange={() => onClickCheckbox?.(item.value)}
                    {...(name && { name })}
                />
            ))}
        </div>

        {items.length > limit && (
            <div className={'border-t border-y-neutral-100 mt-2'}>
                <button onClick={() => setShowAll(!showAll)} className="text-primary mt-1">
                    {showAll ? "Hide" : "+ Show all"}
                </button>
            </div>
        )}
    </div>;
};