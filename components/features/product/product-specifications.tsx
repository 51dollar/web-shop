import type { Specifications } from "@/app/types";
import { memo } from "react";

export const ProductSpecifications = memo(({ specifications }: { specifications: Specifications }) => {
    if (!specifications) return null;

    const specItems = [
        { label: 'Display Size', value: specifications.displaySize },
        { label: 'Display Type', value: specifications.displayType },
        { label: 'Resolution', value: specifications.resolution },
        { label: 'Processor', value: specifications.processor },
        { label: 'RAM', value: `${specifications.ram}GB` },
        { label: 'Battery', value: `${specifications.battery}mAh` },
        { label: 'Main Camera', value: specifications.mainCamera },
        { label: 'Front Camera', value: specifications.frontCamera },
        { label: 'OS', value: specifications.os },
        { label: 'Release Year', value: specifications.releaseYear },
    ];

    return (
        <div className="space-y-3 overflow-auto pr-2">
            <p className="font-semibold text-neutral-700">Specifications</p>
            <div className="grid grid-cols-2 py-2 text-sm text-neutral-500">
                {specItems.map((item, idx) => (
                    <p key={idx}>
                        <b>{item.label}:</b> {item.value}
                    </p>
                ))}
            </div>
        </div>
    );
});

ProductSpecifications.displayName = 'ProductSpecifications';