'use client';

import { cn } from '@/lib/utils';
import { useCategoryStore } from '@/store/category';
import type { Category } from '@/lib/generated/prisma-client';
import Link from 'next/link';

interface CategoriesProps {
    items: Category[];
    className?: string;
}

export const Categories = ({items, className}: CategoriesProps) => {
    const categoryActiveId = useCategoryStore((state) => state.activeId);

    return (
        <div
            className={cn(
                'inline-flex gap-1 rounded-4xl p-1',
                'shadow-sm ring-1 ring-foreground/10 backdrop-blur-md',
                className
            )}
        >
            {items.map(({id, name}, index) => (
                <Link
                    key={index}
                    href={`/#${name}`}
                    scroll={true}
                    className={cn('flex h-7 items-center rounded-4xl px-2 font-medium transition-all hover:bg-muted',
                        categoryActiveId === id &&
                        'bg-background shadow-md ring-1 ring-primary/10 text-primary')}
                >
                    {name}
                </Link>
            ))}
        </div>
    );
};
