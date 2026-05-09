"use client";

import { useFormContext } from "react-hook-form";
import type { CheckoutFormValues } from "./zod-schema";
import {
    FieldSet,
    FieldLegend,
    FieldGroup,
    Field,
    FieldLabel,
    FieldError,
    Input,
    Textarea,
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectItem,
} from "@/components/ui";
import { useCheckoutStore } from "@/store/checkout";
import { useEffect, type FC } from "react";
import { cn } from "@/lib/utils";
import { useDebounce } from "@/hooks";
import { DELIVERY_OPTIONS } from "../../../../lib/delivery-options";
import type { DeliveryTime } from "@/lib/generated/prisma-client";

interface Props {
    title: string
    className?: string;
}

export const DeliveryBlock: FC<Props> = ({ title, className }) => {
    const setDeliveryInfo = useCheckoutStore((state) => state.setDeliveryInfo);
    const savedDeliveryInfo = useCheckoutStore((state) => state.deliveryInfo);
    const savedAddress = savedDeliveryInfo?.address ?? "";
    const savedDeliveryTime = savedDeliveryInfo?.deliveryTime ?? "";
    const savedComment = savedDeliveryInfo?.comment ?? "";

    const {
        register,
        setValue,
        watch,
        formState: { errors },
    } = useFormContext<CheckoutFormValues>();

    const addressValue = watch("address");
    const deliveryTimeValue = watch("deliveryTime");
    const commentValue = watch("comment");

    const debouncedAddress = useDebounce(addressValue, 2000);
    const debouncedDeliveryTime = useDebounce(deliveryTimeValue, 2000);
    const debouncedComment = useDebounce(commentValue, 3000);

    useEffect(() => {
        const isValid = debouncedAddress?.length >= 5 && debouncedDeliveryTime;
        if (!isValid) return;

        const normalizedComment = debouncedComment ?? "";

        const hasChanges =
            savedAddress !== debouncedAddress ||
            savedDeliveryTime !== debouncedDeliveryTime ||
            savedComment !== normalizedComment;

        if (hasChanges) {
            const deliveryData: { address: string; deliveryTime: DeliveryTime; comment?: string } = {
                address: debouncedAddress,
                deliveryTime: debouncedDeliveryTime,
            };
            if (normalizedComment !== "") {
                deliveryData.comment = normalizedComment;
            }
            setDeliveryInfo(deliveryData);
        }
    }, [debouncedAddress, debouncedDeliveryTime, debouncedComment, savedAddress, savedComment, savedDeliveryTime, setDeliveryInfo]);

    const handleDeliveryTimeChange = (value: string) => {
        setValue("deliveryTime", value as DeliveryTime, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
        });
    };

    return (
        <div className={cn("bg-white rounded-[32px] p-4 shadow-sm", className)}>
            <FieldSet>
                <FieldLegend className="font-bold">
                    {title}
                </FieldLegend>

                <FieldGroup>
                    <div className="space-y-4">
                        <Field>
                            <FieldLabel htmlFor="address">Delivery address</FieldLabel>
                            <Input
                                id="address"
                                {...register("address")}
                                placeholder="Street, house, apartment"
                                autoComplete="address-line1"
                                aria-invalid={!!errors.address}
                            />
                            {errors.address && <FieldError>{errors.address.message}</FieldError>}
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="deliveryTime">Delivery time</FieldLabel>
                            <Select
                                value={deliveryTimeValue}
                                onValueChange={handleDeliveryTimeChange}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select delivery time" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {DELIVERY_OPTIONS.map(([key, label]) => (
                                            <SelectItem key={key} value={key}>
                                                {label}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {errors.deliveryTime && <FieldError>{errors.deliveryTime.message}</FieldError>}
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="comment">Order comment (optional)</FieldLabel>
                            <Textarea
                                id="comment"
                                {...register("comment")}
                                placeholder="Any special requests or notes for the delivery"
                                rows={4}
                                aria-invalid={!!errors.comment}
                            />
                            {errors.comment && <FieldError>{errors.comment.message}</FieldError>}
                        </Field>
                    </div>
                </FieldGroup>
            </FieldSet>
        </div>
    );
};
