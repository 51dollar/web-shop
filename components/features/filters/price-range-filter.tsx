'use client'

import { cn } from "@/lib/utils";
import { Input, Slider } from "../../ui";
import { useMemo, type FC } from "react";

interface Props {
    className?: string;
    min: number;
    max: number;
    step: number;
    value: {
        priceFrom: number;
        priceTo: number;
    };
    onChange: (value: { priceFrom: number; priceTo: number }) => void;
}

export const PriceRangeFilter: FC<Props> = ({
    className,
    min,
    max,
    step,
    value,
    onChange,
}) => {
    const safeFrom = Number.isFinite(value.priceFrom)
        ? value.priceFrom
        : min;

    const safeTo = Number.isFinite(value.priceTo)
        ? value.priceTo
        : max;

    const normalized = useMemo(() => {
        return {
            from: Math.max(min, Math.min(safeFrom, safeTo)),
            to: Math.min(max, Math.max(safeFrom, safeTo)),
        };
    }, [safeFrom, safeTo, min, max]);

    return (
        <div className={cn(className)}>
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <p className="font-bold">Price From and To:</p>
                    <span className="text-muted-foreground text-sm">
                        {min}р. - {max}р.
                    </span>
                </div>

                <div className="flex gap-3 mb-2">
                    <Input
                        type="number"
                        aria-label="Price from"
                        value={normalized.from}
                        min={min}
                        max={max}
                        onChange={(e) =>
                            onChange({
                                priceFrom: Number(e.target.value),
                                priceTo: normalized.to,
                            })
                        }
                    />
                    <Input
                        type="number"
                        aria-label="Price to"
                        value={normalized.to}
                        min={min}
                        max={max}
                        onChange={(e) =>
                            onChange({
                                priceFrom: normalized.from,
                                priceTo: Number(e.target.value),
                            })
                        }
                    />
                </div>

                <Slider
                    id="price-slider"
                    min={min}
                    max={max}
                    step={step}
                    value={[normalized.from, normalized.to]}
                    onValueChange={([from = min, to = max]) =>
                        onChange({ priceFrom: from, priceTo: to })
                    }
                />
            </div>
        </div>
    );
};