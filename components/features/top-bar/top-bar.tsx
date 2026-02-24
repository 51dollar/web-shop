import type { FC } from 'react';
import { Container } from "@/components/ui";
import { cn } from "@/lib/utils";
import { Categories, SortPopup } from ".";
import type { Category } from "@/lib/generated/prisma-client";


interface Props {
    categories: Category[];
    className?: string;
}

export const TopBar: FC<Props> = ({categories, className}) => {
    return (
        <div className={cn('z-30 sticky top-0 py-2 shadow-lg shadow-black/5 backdrop-blur-md', className)}>
            <Container className="flex items-center justify-between">
                <Categories items={categories} />
                <SortPopup />
            </Container>
        </div>
    );
};