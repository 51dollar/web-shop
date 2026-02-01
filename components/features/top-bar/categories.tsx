'use client'

import { cn } from '@/lib/utils'
import { phoneCategories } from '@/app/types'
import { useCategoryStore } from '@/store/category'

interface CategoriesProps {
    className?: string
}

export const Categories = ({ className }: CategoriesProps) => {
    const categoryActiveId = useCategoryStore((state) => state.activeId);

    return (
        <div
            className={cn(
                'inline-flex gap-1 rounded-4xl p-1',
                'shadow-sm ring-1 ring-foreground/10 backdrop-blur-md',
                className
            )}
        >
            {phoneCategories.map(({ id, name }, index) => (
                <a className={cn('flex h-7 items-center rounded-4xl px-2 font-medium transition-all hover:bg-muted',
                    categoryActiveId === id &&
                    'bg-background shadow-md ring-1 ring-primary/10 text-primary')}
                    href={`/#${name}`}
                    key={index}
                >
                    {name}
                </a>
            ))}
        </div>
    )
}
