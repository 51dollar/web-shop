import type { FC } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface Props {
  src: string;
  alt: string;
  className?: string;
}

export const CartItemDetailsImage: FC<Props> = ( {src, alt, className} ) => {
  return (
    <div className={cn("relative w-[60px] h-[60px]", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="60px"
        className="object-contain rounded-md"
      />
    </div>
  );
};