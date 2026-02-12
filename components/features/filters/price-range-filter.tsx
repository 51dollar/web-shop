'use client'

import { cn } from "@/lib/utils";
import { Input, Slider } from "../../ui";
import { useState, type FC } from "react";

interface Props {
    className?: string;
}

interface PriceProps {
    priceFrom: number;
    priceTo: number;
}

const MIN = 0;
const MAX = 20000;
const STEP = 50;

export const PriceRangeFilter: FC<Props> = ({ className }) => {
    const [prices, setPrice] = useState<PriceProps>({
        priceFrom: MIN,
        priceTo: MAX
    })

    const { priceFrom, priceTo } = prices;

    const updatePrice = (name: keyof PriceProps, value: number) => {
        setPrice(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className={cn(className)}>
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <p className="font-bold">Price From and To:</p>
                    <span className="text-muted-foreground text-sm">
                        {MIN}р. - {MAX}р.
                    </span>
                </div>

                <div className="flex gap-3 mb-2">
                    <Input
                        type="number"
                        aria-label="Price from"
                        placeholder={String(MIN)}
                        min={MIN}
                        max={MAX}
                        value={String(priceFrom)}
                        onChange={(e) => updatePrice("priceFrom", Number(e.target.value))}
                    />
                    <Input
                        type="number"
                        aria-label="Price to"
                        placeholder={String(MAX)}
                        min={MIN}
                        max={MAX}
                        value={String(priceTo)}
                        onChange={(e) => updatePrice("priceTo", Number(e.target.value))}
                    />
                </div>

                <Slider
                    id="price-slider"
                    min={MIN}
                    max={MAX}
                    step={STEP}
                    value={[priceFrom, priceTo]}
                    onValueChange={([from = 0, to = 0]) =>
                        setPrice({ priceFrom: from, priceTo: to })
                    }
                />
            </div>
        </div>
    );
};