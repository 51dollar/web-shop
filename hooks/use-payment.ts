"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import { Payment } from "@/app/actions";
import {
    PAYMENT_METHODS,
    type PaymentMethod,
} from "@/lib/payment-method";

export function usePayment(orderId: number) {
    const [loading, setLoading] = useState(false);

    const [paymentMethod, setPaymentMethod] =
        useState<PaymentMethod>(PAYMENT_METHODS.CARD_ONLINE);

    const handlePayment = async () => {
        try {
            setLoading(true);

            const result = await Payment(orderId);

            if (!result.success) {
                toast.error(result.error ?? "Payment failed");
                return;
            }

            if (
                paymentMethod === PAYMENT_METHODS.CARD_ONLINE &&
                result.url
            ) {
                window.location.href = result.url;
                return;
            }

            toast.success("Order successfully confirmed");
        } catch {
            toast.error("Unexpected payment error");
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        paymentMethod,
        setPaymentMethod,
        handlePayment,
    };
}
