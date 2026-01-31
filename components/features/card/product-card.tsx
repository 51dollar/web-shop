import { Button, Card, CardDescription, CardTitle } from '@/components/ui';
import { ShoppingBasketDone01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import Link from 'next/link';
import Image from 'next/image'
import React from 'react'

interface Props {
    id: number;
    name: string
    description: string;
    price: number;
    imageUrl: string;
    className?: string;
}

export const ProductCard: React.FC<Props> = ({ id, name, description, price, imageUrl, className }) => {
    const productImage = imageUrl ?? '/public/logo.png'

    return (
        <Card className={className}>
            <div className="p-2">
                <Link href={`/product/${id}`}>
                    <div className="flex items-center justify-center rounded-lg h-60">
                        <Image
                            src={productImage}
                            alt={name}
                            width={215}
                            height={215}
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, 300px"
                        />
                    </div>
                </Link>
                <div className="mt-6 p-1">
                    <CardTitle className="font-bold">{name}</CardTitle>

                    <CardDescription className="">{description}</CardDescription>

                    <div className="flex justify-between items-center mt-1">
                        <span className="text-[20px]">
                            <b>{price}p.</b>
                        </span>

                        <Button>
                            <HugeiconsIcon icon={ShoppingBasketDone01Icon} />
                            Add to Cart
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    )
}
