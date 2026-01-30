'use client'

import { cn } from "@/lib/utils";
import { Input, Slider } from "../ui";
import { useState } from "react";

interface Props {
    className?: string;
}

export const PriceRangeFilter: React.FC<Props> = ({ className }) => {
    const [priceRange, setPriceRange] = useState([0, 5000]);

    return (
        <div className={cn(className)}>
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <p className="font-bold">Price From and To:</p>
                    <span className="text-muted-foreground text-sm">
                        {priceRange[0]}р. - {priceRange[1]}р.
                    </span>
                </div>

                <div className="flex gap-3 mb-2">
                    <Input
                        type="number"
                        placeholder="0"
                        min={0}
                        max={priceRange[1]}
                        value={priceRange[0] === 0 ? "" : priceRange[0]}
                        onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    />
                    <Input
                        type="number"
                        placeholder="5000"
                        min={priceRange[0]}
                        max={5000}
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    />
                </div>

                <Slider
                    id="price-slider"
                    value={priceRange}
                    onValueChange={setPriceRange}
                    min={0}
                    max={5000}
                    step={10}
                />
            </div>
        </div>
    );
};