"use client";

import { createOrder } from "@/app/actions";
import type { CheckoutFormValues } from "./zod-schema";
import { Button } from "@/components/ui";
import {
    FieldSet,
    FieldLegend,
    FieldGroup,
} from "@/components/ui";
import { useOrderSummary } from "@/hooks";
import { cn } from "@/lib/utils";
import { useMemo, useState, type FC } from "react";
import { useFormContext } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { DELIVERY_TIME_MAP } from "@/lib/delivery-options";

interface Props {
    title: string
    className?: string;
}

export const TotalAmountBlock: FC<Props> = ({ title, className }) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const {
        handleSubmit,
        formState: { isValid },
        watch,
    } = useFormContext<CheckoutFormValues>();

    const {
        deliveryPrice,
        subtotal,
        total,
        items,
        clearCheckout,
    } = useOrderSummary();

    const [firstName, lastName, email, phone, address, deliveryTime] = watch([
        "firstName",
        "lastName",
        "email",
        "phone",
        "address",
        "deliveryTime",
    ]);
    const comment = watch("comment");
    const displayedItems = useMemo(() => items.slice(0, 10), [items]);
    const hasMoreItems = items.length > 10;
    const remainingCount = items.length - 10;

    const onSubmit = handleSubmit(async (data: CheckoutFormValues) => {
        try {
            setLoading(true);

            const result = await createOrder(data);

            if (result.success === false && result.error) {
                toast.error(result.error, { icon: "❌" });
                return;
            }
            if (result.success === true && result.url) {
                router.push(result.url);
                clearCheckout();
            }
        } catch {
            toast.error("Unexpected error", { icon: "❌" });
        } finally {
            setLoading(false);
        }
    });

    return (
        <div className={cn("bg-white rounded-[32px] p-4 shadow-sm", className)}>
            <FieldSet>
                <FieldLegend className="font-bold">
                    {title}
                </FieldLegend>

                <FieldGroup>
                    <div className="space-y-3 max-h-[200px] overflow-y-auto mb-2">
                        {displayedItems.map((item) => (
                            <div key={item.id} className="flex justify-between text-sm">
                                <span className="text-gray-600">
                                    {item.name} x{item.quantity}
                                </span>
                                <span className="font-medium">{item.price} Br</span>
                            </div>
                        ))}
                        {hasMoreItems && (
                            <div className="text-sm text-gray-500">
                                +{remainingCount} more items
                            </div>
                        )}
                    </div>

                    <div className="border-t border-gray-200 pt-2 space-y-3">
                        <div className="flex justify-between text-gray-600">
                            <span>Subtotal</span>
                            <span>{subtotal} Br</span>
                        </div>

                        <div className="flex justify-between text-gray-600">
                            <span>Delivery</span>
                            <span>{deliveryPrice === 0 ? "Free" : `${deliveryPrice} Br`}</span>
                        </div>

                        <div className="border-t border-gray-200 pt-2 mt-2">
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>{total} Br</span>
                            </div>
                        </div>

                        {firstName && lastName && (
                            <div className="mt-4 p-3 bg-gray-50 rounded-xl text-sm">
                                <p className="font-medium mb-1">Recipient:</p>
                                <p className="text-gray-600">
                                    {firstName} {lastName}
                                </p>
                                {(email || phone) && (
                                    <p className="text-gray-500 text-xs mt-1">
                                        {email} {email && phone ? "•" : ""} {phone}
                                    </p>
                                )}
                            </div>
                        )}

                        {address && (
                            <div className="mt-4 p-3 bg-gray-50 rounded-xl text-sm">
                                <p className="font-medium mb-1">Delivery to:</p>
                                <p className="text-gray-600">{address}</p>
                                {deliveryTime && (
                                    <p className="text-gray-500 text-xs mt-1">
                                        Delivery time: {DELIVERY_TIME_MAP[deliveryTime]}
                                    </p>
                                )}
                                {comment && (
                                    <p className="text-gray-500 text-xs mt-1">{comment}</p>
                                )}
                            </div>
                        )}


                        <Button
                            type="submit"
                            loading={loading}
                            onClick={onSubmit}
                            disabled={!isValid}
                            className="w-full h-12 text-base font-semibold mt-2"
                        >
                            Place order
                        </Button>

                        {!isValid && (
                            <p className="text-xs text-gray-400 text-center mt-2">
                                Please fill in all required fields
                            </p>
                        )}
                    </div>
                </FieldGroup>
            </FieldSet>
        </div>
    );
};