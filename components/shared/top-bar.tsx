import { cn } from "@/lib/utils";
import { Categories, Container, SortPopup } from ".";


interface Props {
    className?: string
}

export const TopBar: React.FC<Props> = ({ className }) => {
    return (
        <div className={cn('sticky top-0 py-2 shadow-lg shadow-black/5', className)}>
            <Container className="flex items-center justify-between">
                <Categories />
                <SortPopup />
            </Container>
        </div>
    );
};