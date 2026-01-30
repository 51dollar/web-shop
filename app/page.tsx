import { Container, Title, TopBar } from "@/components/shared";

export default function Page() {
    return (

        <>
            <Container className="mt-4">
                <Title text="Phone" size="lg" className="font-extrabold" />
            </Container>

            <TopBar />

            <div style={{ height: '3000px' }} />
        </>
    );
}