"use client"

import { FilterChecboxProps } from "@/app/types";
import { Input } from "../ui";
import { FilterCheckbox } from ".";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Item = FilterChecboxProps;

interface Props {
    title: string;
    items: Item[];
    defaultItems: Item[];
    limit?: number;
    searchInputPlaceholder?: string;
    onChange?: (values: string[]) => void;
    defaultValue?: string[];
    className?: string;
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
    title,
    items,
    defaultItems,
    limit = 5,
    searchInputPlaceholder = 'Search...',
    className,
    onChange,
    defaultValue,
}) => {
    const [showAll, setShowAll] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    }

    const list = showAll
        ? items.filter((item) => item.text.toLowerCase().includes(searchValue.toLowerCase()))
        : defaultItems.slice(0, limit);

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
            {list.map((item) => (
                <FilterCheckbox
                    key={item.value}
                    text={item.text}
                    value={item.value}
                    endAdornment={item.endAdornment}
                    checked={false}
                    onCheckedChange={(ids) => console.log(ids)}
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