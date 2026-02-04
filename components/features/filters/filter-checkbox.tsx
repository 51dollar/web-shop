import React from 'react';
import { Checkbox } from '../../ui/checkbox';
import type { FilterCheckboxProps } from '@/app/types';

export const FilterCheckbox: React.FC<FilterCheckboxProps> = ({
    text,
    value,
    endAdornment,
    onCheckedChange,
    checked,
}) => {
    return (
        <div className="flex items-center space-x-2">
            <Checkbox
                onCheckedChange={onCheckedChange}
                checked={checked}
                value={value}
                className="rounded-xl w-4 h-4"
                id={`checkbox-${String(value)}`}
            />
            <label htmlFor={`checkbox-${String(value)}`} className="leading-none cursor-pointer flex-1">
                {text}
            </label>
            {endAdornment}
        </div>
    );
};