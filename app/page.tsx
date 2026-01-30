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
                            Product list
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}