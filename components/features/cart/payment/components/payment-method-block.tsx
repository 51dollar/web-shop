import { cn } from "@/lib/utils";
import {
    FieldSet,
    FieldLegend,
} from "@/components/ui";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

import type { Order } from "@/lib/generated/prisma-client";
import {
    PAYMENT_METHODS,
    type PaymentMethod,
} from "@/lib/payment-method";
import { PAYMENT_METHOD_CONFIG } from "@/lib/payment-method-config";
import { HugeiconsIcon } from "@hugeicons/react";


interface Props {
    title: string;
    order: Order;
    paymentMethod: PaymentMethod;
    setPaymentMethod: (value: PaymentMethod) => void;
    className?: string;
}

export function PaymentMethodBlock({
    title,
    order,
    paymentMethod,
    setPaymentMethod,
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

                <Accordion
                    type="single"
                    collapsible={false}
                    value={paymentMethod}
                    onValueChange={(value) => {
                        if (
                            Object.values(PAYMENT_METHODS).includes(
                                value as PaymentMethod
                            )
                        ) {
                            setPaymentMethod(value as PaymentMethod);
                        }
                    }}
                    className="space-y-3 border-0"
                >
                    {Object.entries(PAYMENT_METHOD_CONFIG).map(
                        ([key, config]) => {
                            return (
                                <AccordionItem
                                    key={key}
                                    value={key}
                                    className={cn(
                                        "rounded-3xl border border-gray-300 bg-gray-50 px-2 transition-all",
                                        paymentMethod === key &&
                                        "border-black data-open:bg-white shadow-sm"
                                    )}
                                >
                                    <AccordionTrigger className="hover:no-underline">
                                        <div className="flex items-center gap-3 text-left">
                                            <div >
                                                <HugeiconsIcon
                                                    icon={config.icon}
                                                    size={22}
                                                    strokeWidth={1.8}
                                                />
                                            </div>

                                            <div>
                                                <p className="font-semibold text-black">
                                                    {config.label}
                                                </p>
                                            </div>
                                        </div>
                                    </AccordionTrigger>

                                    <AccordionContent className="text-sm text-gray-500">
                                        {config.description}
                                    </AccordionContent>
                                </AccordionItem>
                            );
                        }
                    )}
                </Accordion>

                <div className="p-3 bg-gray-100 rounded-3xl text-sm">
                    <p className="font-medium mb-1">
                        Delivery address:
                    </p>

                    <p className="text-gray-600">
                        {order.address ?? "Address not specified"}
                    </p>
                </div>
            </FieldSet>
        </div>
    );
}
