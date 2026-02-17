"use client";

import { type FC } from "react";
import { Checkbox } from "../../ui/checkbox";
import type { FilterCheckboxProps } from "@/app/types";

export const FilterCheckbox: FC<FilterCheckboxProps> = ({
    text,
    value,
    endAdornment,
    onCheckedChange,
    checked,
    name,
}) => {
    const id = `checkbox-${name ?? "filter"}-${value}`;

    return (
        <div className="flex items-center space-x-2">
            <Checkbox
                id={id}
                checked={checked ?? false}
                onCheckedChange={(val) => {
                    onCheckedChange?.(Boolean(val));
                }}
                className="rounded-xl w-4 h-4"
            />

            <label
                htmlFor={id}
                className="leading-none cursor-pointer flex-1"
            >
                {text}
            </label>

            {endAdornment}
        </div>
    );
};
