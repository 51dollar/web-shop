import type { FC } from "react";
import { cn } from "@/lib/utils";
import { Button } from '../ui/button';
import { Add01Icon, Remove01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { CountButtonProps } from "@/components/ui/count-button";

interface IconButtonProps {
  size?: CountButtonProps['size'];
  disabled?: boolean;
  type?: 'plus' | 'minus';
  onClick?: () => void;
}

export const CountIconButton: FC<IconButtonProps> = ( {
  size = 'sm',
  disabled,
  type,
  onClick
} ) => {
  return (
    <Button
      variant="outline"
      disabled={disabled}
      onClick={onClick}
      type="button"
      className={cn(
        'p-0 hover:bg-primary hover:text-white disabled:bg-white disabled:border-gray-400 disabled:text-gray-400',
        size === 'sm' ? 'w-[30px] h-[30px] rounded-full' : 'w-[38px] h-[38px] rounded-full'
      )}>
      {type === 'plus' ? (
        <HugeiconsIcon icon={Add01Icon} className={size === 'sm' ? 'h-4' : 'h-5'} />
      ) : (
        <HugeiconsIcon icon={Remove01Icon} className={size === 'sm' ? 'h-4' : 'h-5'} />
      )}
    </Button>
  );
};