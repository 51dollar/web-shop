import { PaymentForm } from "@/components/features/cart/payment/payment-form";
import { Container, Title } from "@/components/ui";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface PaymentPageProps {
    searchParams: Promise<{
        orderId?: string;
    }>;
}

export default async function PaymentPage({
    searchParams,
}: PaymentPageProps) {
    const params = await searchParams;
    const orderId = Number(params.orderId);

    if (!orderId) notFound();

    const order = await prisma.order.findUnique({
        where: { id: orderId },
    });

    if (!order) notFound();

    return (
        <Container className="py-10">
            <div className="max-w-5xl mx-auto">
                <Title
                    text="Select payment method"
                    size="md"
                    className="font-extrabold mb-8"
                />

                <div className="flex flex-col lg:flex-row gap-6">
                    <PaymentForm order={order} />
                </div>
            </div>
        </Container>
    );
}
