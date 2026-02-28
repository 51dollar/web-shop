import type { FC } from 'react';
import { cn } from '@/lib/utils';
import Image from "next/image";

interface Props {
  className?: string;
  src: string;
  alt: string;
  priority?: boolean;
}

export const ProductPreview: FC<Props> = ({className, src, alt, priority = false}) => {
  return (
    <div className={cn("relative", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-contain transition-all duration-300"
      />
    </div>
  );
};