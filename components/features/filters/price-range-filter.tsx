'use client'

import { cn } from "@/lib/utils";
import { Input, Slider } from "../../ui";
import { useState, type FC } from "react";
import { Skeleton } from "../../ui";

interface Props {
    className?: string;
    min: number;
    max: number;
    step: number;
    loading?: boolean;
}

interface PriceProps {
    priceFrom: number;
    priceTo: number;
}

export const PriceRangeFilter: FC<Props> = ({ className, min, max, step, loading }) => {
    const [prices, setPrice] = useState<PriceProps>({
        priceFrom: min,
        priceTo: max
    })

    const { priceFrom, priceTo } = prices;

    const updatePrice = (name: keyof PriceProps, value: number) => {
        setPrice(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    if (loading) {
        return (
            <div className={cn(className, "space-y-4")}>
                <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-34" />
                    <Skeleton className="h-4 w-26" />
                </div>

                <div className="flex gap-3">
                    <Skeleton className="h-10 flex-1 rounded-3xl" />
                    <Skeleton className="h-10 flex-1 rounded-3xl" />
                </div>

                <Skeleton className="h-4 w-full rounded-full" />
            </div>
        )
    }

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
                        placeholder={String(min)}
                        min={min}
                        max={max}
                        value={String(priceFrom)}
                        onChange={(e) => updatePrice("priceFrom", Number(e.target.value))}
                    />
                    <Input
                        type="number"
                        aria-label="Price to"
                        placeholder={String(max)}
                        min={min}
                        max={max}
                        value={String(priceTo)}
                        onChange={(e) => updatePrice("priceTo", Number(e.target.value))}
                    />
                </div>

                <Slider
                    id="price-slider"
                    min={min}
                    max={max}
                    step={step}
                    value={[priceFrom, priceTo]}
                    onValueChange={([from = 0, to = 0]) =>
                        setPrice({ priceFrom: from, priceTo: to })
                    }
                />
            </div>
        </div>
    );
};