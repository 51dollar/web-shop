import type { FC } from 'react';
import { cn } from '@/lib/utils';
import { Title } from '@/components/ui';

interface Props {
  className?: string;
  description: string;
}

export const DescriptionProduct: FC<Props> = ({className, description}) => {
  return (
    <div className={cn(className)}>
      <Title text="Description" />

      <p className="text-neutral-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
};