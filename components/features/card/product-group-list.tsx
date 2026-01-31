import { Title } from '@/components/ui';
import { cn } from '@/lib/utils';
import { ProductCard } from './product-card';

interface Props {
    title: string;
    items: any[];
    categoryId: number;
    listClassName?: string;
    className?: string;
}

export const ProductGroupList = ({ title, items, categoryId, listClassName, className }: Props) => {
    return (
        <div className={className}>
            <Title text={title} size="lg" className="font-extrabold" ></Title>

            <div className={cn("grid grid-cols-3 gap-12 mt-4")}>
                {items.map((product, i) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        description={product.description}
                        price={product.items[0].price}
                        imageUrl={product.imageUrl}
                    />
                ))}
            </div>
        </div>
    );
};
