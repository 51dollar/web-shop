"use client";

import type { Order } from "@/lib/generated/prisma-client";

import { usePayment } from "@/hooks/use-payment";
import { PaymentMethodBlock } from "./components/payment-method-block";
import { PaymentAmountBlock } from "./components/payment-amount-block";

interface Props {
    order: Order;
}

export function PaymentForm({ order }: Props) {
    const {
        loading,
        paymentMethod,
        setPaymentMethod,
        handlePayment,
    } = usePayment(order.id);

    return (
        <>
            <div className="lg:w-2/3 w-full space-y-6">
                <PaymentMethodBlock
                    title="1. Payment method"
                    order={order}
                    paymentMethod={paymentMethod}
                    setPaymentMethod={setPaymentMethod}
                />
            </div>

            <div className="lg:w-1/3 w-full">
                <PaymentAmountBlock
                    title="2. Order summary"
                    loading={loading}
                    totalAmount={order.totalAmount}
                    paymentMethod={paymentMethod}
                    handlePayment={handlePayment}
                />
            </div>
        </>
    );
}
