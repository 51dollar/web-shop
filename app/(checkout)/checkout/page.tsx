"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { CartBlock, PersonalInfoBlock, DeliveryBlock, TotalAmountBlock, } from "@/components/features/cart/checkout";
import { Container, Title } from "@/components/ui";
import { checkoutFormSchema, type CheckoutFormValues } from "@/components/features/cart/checkout/zod-schema";
import { useCheckoutStore } from "@/store/checkout";
import { formatPhoneNumber } from "@/lib/phone";
import { DeliveryTime } from "@/lib/generated/prisma-client";

export default function CheckoutPage() {
    const personalInfo = useCheckoutStore((state) => state.personalInfo);
    const deliveryInfo = useCheckoutStore((state) => state.deliveryInfo);


    const form = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutFormSchema),
        mode: "onChange",
        defaultValues: {
            firstName: personalInfo?.firstName ?? "",
            lastName: personalInfo?.lastName ?? "",
            email: personalInfo?.email ?? "",
            phone: formatPhoneNumber(personalInfo?.phone ?? ""),
            address: deliveryInfo?.address ?? "",
            comment: deliveryInfo?.comment ?? "",
            deliveryTime: deliveryInfo?.deliveryTime ?? DeliveryTime.MORNING,
        },
    });

    const onSubmit = (data: CheckoutFormValues) => {
        console.log(data);
    };

    return (
        <Container className="mt-5 pb-10">
            <Title text="Order registration" size="md" className="font-extrabold mb-8" />

            <FormProvider {...form}>
                <form 
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col lg:flex-row gap-6"
                >
                    <div className="lg:w-2/3 w-full space-y-6">
                        <CartBlock title="1. Cart" />
                        <PersonalInfoBlock title="2. Personal information" />
                        <DeliveryBlock title="3. Delivery information" />
                    </div>

                    <div className="lg:w-1/3 w-full">
                        <TotalAmountBlock title="4. Order summary" />
                    </div>
                </form>
            </FormProvider>
        </Container>
    );
}
