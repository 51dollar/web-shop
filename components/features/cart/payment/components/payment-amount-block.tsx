import {
    Button,
    FieldSet,
    FieldLegend,
    FieldGroup,
} from "@/components/ui";

import { cn } from "@/lib/utils";
import {
    PAYMENT_METHODS,
    type PaymentMethod,
} from "@/lib/payment-method";

interface Props {
    title: string;
    loading: boolean;
    totalAmount: number;
    paymentMethod: PaymentMethod;
    handlePayment: () => Promise<void>;
    className?: string;
}

const PAYMENT_LABELS: Record<PaymentMethod, string> = {
    [PAYMENT_METHODS.CARD_ONLINE]: "Card Online",
    [PAYMENT_METHODS.CASH_ON_DELIVERY]: "Cash on Delivery",
    [PAYMENT_METHODS.CARD_ON_DELIVERY]: "Card on Delivery",
    [PAYMENT_METHODS.INSTALLMENTS]: "Installments",
};

export function PaymentAmountBlock({
    title,
    loading,
    totalAmount,
    paymentMethod,
    handlePayment,
    className,
}: Props) {
    return (
        <div className={cn(
            "bg-white rounded-[32px] p-4 shadow-sm",
            className
        )}>
            <FieldSet>
                <FieldLegend className="font-bold">
                    {title}
                </FieldLegend>

                <FieldGroup>
                    <div className="border-t border-gray-200 pt-2 space-y-3">
                        <div className="flex justify-between text-gray-600">
                            <span>Payment method</span>
                            <span>{PAYMENT_LABELS[paymentMethod]}</span>
                        </div>

                        <div className="border-t border-gray-200 pt-2">
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>{totalAmount} Br</span>
                            </div>
                        </div>

                        <Button
                            loading={loading}
                            onClick={handlePayment}
                            className="w-full h-12 text-base font-semibold mt-2"
                        >
                            {paymentMethod === PAYMENT_METHODS.CARD_ONLINE
                                ? "Proceed to payment"
                                : "Confirm order"}
                        </Button>
                    </div>
                </FieldGroup>
            </FieldSet>
        </div>
    );
}
