import React from 'react';
import { cn } from '@/lib/utils';
import { Button, Container } from '../../ui';
import { HugeiconsIcon } from '@hugeicons/react';
import { UserIcon } from '@hugeicons/core-free-icons';
import Link from 'next/link';
import { CartButton, SearchInput } from './components';

interface Props {
  hasSearch?: boolean;
  hasCart?: boolean;
  buttonVariant?: "outline" | "link" | "default" | "secondary" | "ghost" | "destructive" | "white" | "outlineBlack";
  className?: string;
}

export const Header: React.FC<Props> = ({
  hasSearch = true,
  hasCart = true,
  buttonVariant = "outline",
  className }) => {
  return (
    <header className={cn('border border-b', className)}>
      <Container className="flex flex-row items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-3">
          <h1 className="text-2xl uppercase font-semibold">
            Unibody
          </h1>
        </Link>

        {hasSearch && <div className="mx-10 flex-1">
          <SearchInput />
        </div>}

        <div className="flex items-center gap-3 ml-auto">
          <Button variant={buttonVariant} className="flex items-center">
            <HugeiconsIcon icon={UserIcon} />
            Sign in
          </Button>

          {hasCart && <CartButton />}
        </div>
      </Container>
    </header>
  );
};