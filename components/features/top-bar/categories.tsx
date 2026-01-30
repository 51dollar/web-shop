import { cn } from "@/lib/utils"
import {
    Tabs,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { phoneCategories } from "@/app/types"

interface CategoriesProps {
    className?: string
}

export const Categories: React.FC<CategoriesProps> = ({ className }) => {
    return (
        <Tabs className={cn('', className)}>
            <TabsList>
                {phoneCategories.map((category) => (
                    <TabsTrigger key={category} value={category}>
                        {category}
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
    )
}