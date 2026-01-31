import { ProductGroupList } from "@/components/features/card";
import { Filters } from "@/components/features/filters";
import { TopBar } from "@/components/features/top-bar";
import { Container, Title } from "@/components/ui";


export default function Page() {
    return (

        <>
            <Container className="mt-4">
                <Title text="Phone" size="lg" className="font-extrabold" />
            </Container>

            <TopBar />

            <Container className="mt-5 pb-14">
                <div className="flex gap-15">
                    <div className="w-62.5">
                        <Filters />
                    </div>

                    <div className="flex-1">
                        <div className="flex flex-col gap-16">
                            <ProductGroupList
                                title="Apple"
                                categoryId={1}
                                items={[
                                    {
                                        id: 1,
                                        name: "iPhone 16e",
                                        description: "Best iPhone in the world",
                                        price: 1599,
                                        items: [{ price: 1598 }],
                                        imageUrl: "https://www.apple.com/v/iphone-16e/f/images/overview/contrast/iphone_16e__dxha4illuf2a_xlarge_2x.jpg"
                                    },
                                    {
                                        id: 2,
                                        name: "iPhone 16",
                                        description: "Best iPhone in the world",
                                        price: 2199,
                                        items: [{ price: 2198 }],
                                        imageUrl: "https://www.apple.com/v/iphone-16e/f/images/overview/contrast/iphone_16e__dxha4illuf2a_xlarge_2x.jpg"
                                    },
                                    {
                                        id: 3,
                                        name: "iPhone 16 pro",
                                        description: "Best iPhone in the world",
                                        price: 2499,
                                        items: [{ price: 2498 }],
                                        imageUrl: "https://www.apple.com/v/iphone-16e/f/images/overview/contrast/iphone_16e__dxha4illuf2a_xlarge_2x.jpg"
                                    },
                                    {
                                        id: 4,
                                        name: "iPhone 17",
                                        description: "Best iPhone in the world",
                                        price: 1599,
                                        items: [{ price: 1598 }],
                                        imageUrl: "https://www.apple.com/v/iphone-16e/f/images/overview/contrast/iphone_16e__dxha4illuf2a_xlarge_2x.jpg"
                                    },
                                    {
                                        id: 5,
                                        name: "iPhone 16 pro",
                                        description: "Best iPhone in the world",
                                        price: 1599,
                                        items: [{ price: 1598 }],
                                        imageUrl: "https://www.apple.com/v/iphone-16e/f/images/overview/contrast/iphone_16e__dxha4illuf2a_xlarge_2x.jpg"
                                    }
                                ]} />

                            <ProductGroupList
                                title="Samsung"
                                categoryId={2}
                                items={[
                                    {
                                        id: 1,
                                        name: "Samsung S25",
                                        description: "Innovation in every detail",
                                        price: 2199,
                                        items: [{ price: 2198 }],
                                        imageUrl: "https://images.samsung.com/is/image/samsung/p6pim/us/sm-s731uzwexaa/gallery/us-galaxy-s25-fe-sm-s731-sm-s731uzwexaa-548774647?$product-details-jpg$"
                                    },
                                    {
                                        id: 2,
                                        name: "Samsung S25+",
                                        description: "Innovation in every detail",
                                        price: 2499,
                                        items: [{ price: 2498 }],
                                        imageUrl: "https://images.samsung.com/is/image/samsung/p6pim/us/sm-s731uzwexaa/gallery/us-galaxy-s25-fe-sm-s731-sm-s731uzwexaa-548774647?$product-details-jpg$"
                                    },
                                    {
                                        id: 3,
                                        name: "Samsung S25 EF",
                                        description: "Innovation in every detail",
                                        price: 1999,
                                        items: [{ price: 1998 }],
                                        imageUrl: "https://images.samsung.com/is/image/samsung/p6pim/us/sm-s731uzwexaa/gallery/us-galaxy-s25-fe-sm-s731-sm-s731uzwexaa-548774647?$product-details-jpg$"
                                    },
                                    {
                                        id: 4,
                                        name: "Samsung S25 Edge",
                                        description: "Innovation in every detail",
                                        price: 2799,
                                        items: [{ price: 2798 }],
                                        imageUrl: "https://images.samsung.com/is/image/samsung/p6pim/us/sm-s731uzwexaa/gallery/us-galaxy-s25-fe-sm-s731-sm-s731uzwexaa-548774647?$product-details-jpg$"
                                    },
                                    {
                                        id: 5,
                                        name: "Samsung S25 Ultra",
                                        description: "Innovation in every detail",
                                        price: 3299,
                                        items: [{ price: 3298 }],
                                        imageUrl: "https://images.samsung.com/is/image/samsung/p6pim/us/sm-s731uzwexaa/gallery/us-galaxy-s25-fe-sm-s731-sm-s731uzwexaa-548774647?$product-details-jpg$"
                                    },
                                ]} />
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}