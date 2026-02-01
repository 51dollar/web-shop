import { Container } from "@/components/ui";
import { cn } from "@/lib/utils";
import { Categories, SortPopup } from ".";


interface Props {
    className?: string
}

export const TopBar: React.FC<Props> = ({ className }) => {
    return (
        <div className={cn('z-30 sticky top-0 py-2 shadow-lg shadow-black/5 backdrop-blur-md', className)}>
            <Container className="flex items-center justify-between">
                <Categories />
                <SortPopup />
            </Container>
        </div>
    );
};