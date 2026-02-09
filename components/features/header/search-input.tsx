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

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export const SearchInput = () => {
    const [focused, setFocused] = useState(false);
    const [query, setQuery] = useState("");

    const popoverOpen = query.trim().length > 0;

    const closeAll = () => {
        setFocused(false);
        setQuery("");
    };

    return (
        <>
            {focused && (
                <div
                    className="fixed inset-0 bg-black/50 z-40"
                    onClick={closeAll}
                />
            )}

            <Popover open={popoverOpen}>
                <PopoverTrigger asChild>
                    <div className="relative z-50 w-full">
                        <InputGroup className="bg-white shadow-xs">
                            <InputGroupInput
                                placeholder="Search..."
                                value={query}
                                onFocus={() => setFocused(true)}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <InputGroupAddon
                                className="cursor-pointer"
                                onClick={() => setFocused(true)}
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

                <PopoverContent
                    className="z-50 w-72 p-2"
                    align="start"
                    side="bottom"
                    sideOffset={8}
                    onOpenAutoFocus={(e) => e.preventDefault()}
                >
                    <div className="space-y-2">
                        <Link
                            className="flex items-center gap-4 px-2 hover:bg-gray-100 rounded-xl"
                            href="/product/1">
                            <Image
                                src="https://www.apple.com/v/iphone-16e/f/images/overview/contrast/iphone_16e__dxha4illuf2a_xlarge_2x.jpg"
                                alt="iPhone 16e"
                                width={42}
                                height={42}
                                className="rounded-lg object-cover"
                            />
                            <span>
                                {query}
                            </span>
                        </Link>
                    </div>
                </PopoverContent>
            </Popover>
        </>
    );
};
