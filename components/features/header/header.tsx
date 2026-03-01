import React from 'react';
import { cn } from '@/lib/utils';
import { Button, Container } from '../../ui';
import { HugeiconsIcon } from '@hugeicons/react';
import { UserIcon } from '@hugeicons/core-free-icons';
import Link from 'next/link';
import { SearchInput } from './search-input';
import { CartButton } from '@/components/features/header/cart-button';

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ( {className} ) => {
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

          <CartButton />
        </div>
      </Container>
    </header>
  );
};