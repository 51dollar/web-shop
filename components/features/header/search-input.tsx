"use client";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Api } from "@/services/api-client";
import type { Product } from "@/lib/generated/prisma-client";
import { useClickAway, useDebounce } from "react-use";

export const SearchInput = () => {
    const [focused, setFocused] = useState(false);
    const [query, setQuery] = useState('');
    const [products, setProducts] = useState<Product[]>([]);
    const ref = useRef(null);

    useClickAway(ref, () => {
        setFocused(false);
    });

    useDebounce(() => {
        Api.products.search(query).then((items => {
            setProducts(items);
        }));
    }, 300, [query]);

    const closeAll = () => {
        setFocused(false);
        setQuery('');
        setProducts([]);
    };

    return (
        <>
            {focused && <div className="fixed inset-0 bg-black/50 z-40" />}

            <Popover>
                <PopoverTrigger asChild>
                    <div
                        ref={ref}
                        className="relative z-50 w-full">
                        <InputGroup className="bg-white shadow-xs">
                            <InputGroupInput
                                placeholder="Search..."
                                value={query}
                                onFocus={() => setFocused(true)}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <InputGroupAddon
                                className="cursor-pointer"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width={24}
                                    height={24}
                                    fill="none"
                                >
                                    <path
                                        d="M17 17L21 21"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M19 11C19 6.58 15.42 3 11 3C6.58 3 3 6.58 3 11C3 15.42 6.58 19 11 19C15.42 19 19 15.42 19 11Z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </InputGroupAddon>
                        </InputGroup>
                    </div>
                </PopoverTrigger>

                {products.length > 0 && (
                    <PopoverContent
                        className="z-50 p-2"
                        align="start"
                        side="bottom"
                        sideOffset={8}
                        onOpenAutoFocus={(e) => e.preventDefault()}
                    >
                        <div className="space-y-2">
                            {products.map(product => (
                                <Link
                                    onClick={closeAll}
                                    key={product.id}
                                    href={`/product/${product.id}`}
                                    className="flex items-center gap-4 px-2 py-1 rounded-xl hover:bg-gray-100"
                                >
                                    <div className="relative w-14 h-14 shrink-0">
                                        <Image
                                            src={product.imageUrl}
                                            alt={product.name}
                                            fill
                                            className="rounded-sm object-cover"
                                            sizes="40px"
                                        />
                                    </div>
                                    <span>{product.name}</span>
                                </Link>
                            ))}
                        </div>
                    </PopoverContent>
                )}
            </Popover>
        </>
    );
};
