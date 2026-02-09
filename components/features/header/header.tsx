import React from 'react';
import { cn } from '@/lib/utils';
import { Button, Container } from '../../ui';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowRight02Icon, ShoppingBasket01Icon, UserIcon } from '@hugeicons/core-free-icons';
import Link from 'next/link';
import { SearchInput } from './search-input';

interface Props {
    className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
    return (
        <header className={cn('border border-b', className)}>
            <Container className="flex flex-row items-center justify-between py-3">
                <Link href="/" className="flex items-center gap-3">
                    <h1 className="text-2xl Uppercase font-semibold">
                        Unibody
                    </h1>
                </Link>

                <div className="mx-10 flex-1">
                    <SearchInput />
                </div>

                <div className="flex items-center gap-3 ml-auto">
                    <Button variant="outline" className="flex items-center">
                        <HugeiconsIcon icon={UserIcon} />
                        Sign in
                    </Button>

                    <div>
                        <Button className="group relative">
                            <b>
                                500p
                            </b>
                            <span className="h-full w-px bg-white/30 mx-2" />
                            <div className="flex item-center transition duration-300 group-hover:opacity-0">
                                <HugeiconsIcon size={14} className="relative" icon={ShoppingBasket01Icon} />
                                <b>
                                    3
                                </b>
                            </div>
                            <HugeiconsIcon size={20} className="absolute right-5 transition duration-300
                                -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                                icon={ArrowRight02Icon} />
                        </Button>
                    </div>
                </div>
            </Container>
        </header>
    );
};