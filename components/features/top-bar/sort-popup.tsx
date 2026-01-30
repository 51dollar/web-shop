import { cn } from "@/lib/utils";
import { ArrowUpDownIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button, Popover, PopoverContent, PopoverTrigger } from "../../ui";

interface Props {
    className?: string
}

export const SortPopup: React.FC<Props> = ({ className }) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className={cn('gap-2', className)}>
                    <HugeiconsIcon size={16} icon={ArrowUpDownIcon} />
                    <b>Sort by: </b>
                    <b className="text-primary">popular</b>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="">
                <div className="">


                </div>
            </PopoverContent>
        </Popover>
    );
};