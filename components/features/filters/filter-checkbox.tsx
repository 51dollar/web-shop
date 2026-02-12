import { type FC } from 'react';
import { Checkbox } from '../../ui/checkbox';
import type { FilterCheckboxProps } from '@/app/types';

export const FilterCheckbox: FC<FilterCheckboxProps> = ({
    text,
    value,
    endAdornment,
    onCheckedChange,
    checked,
    name
}) => {
    return (
        <div className="flex items-center space-x-2">
            <Checkbox
                checked={checked ?? false}
                value={value}
                className="rounded-xl w-4 h-4"
                id={`checkbox-${String(value)}`}
                onCheckedChange={(val) => {
                    if (onCheckedChange) {
                        onCheckedChange(Boolean(val));
                    }
                }}
            />
            <label
                htmlFor={`checkbox-${String(name)}}-${String(value)}`}
                className="leading-none cursor-pointer flex-1"
            >
                {text}
            </label>
            {endAdornment}
        </div>
    );
};