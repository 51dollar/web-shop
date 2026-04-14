"use client";

import { useFormContext } from "react-hook-form";
import type { CheckoutFormValues, PersonalInfoForm } from "./zod-schema";
import {
    FieldSet,
    FieldLegend,
    FieldGroup,
    Field,
    FieldLabel,
    FieldError,
    Input,
    PhoneInput,
} from "@/components/ui";
import { useCheckoutStore } from "@/store/checkout";
import { useEffect, type FC } from "react";
import { cn } from "@/lib/utils";
import { useDebounce } from "@/hooks";
import { formatPhoneNumber, isValidPhoneNumber } from "@/lib/phone";

interface Props {
    title: string
    className?: string;
}

export const PersonalInfoBlock: FC<Props> = ({ title, className }) => {
    const setPersonalInfo = useCheckoutStore((state) => state.setPersonalInfo);
    const savedPersonalInfo = useCheckoutStore((state) => state.personalInfo);

    const {
        register,
        watch,
        formState: { errors },
    } = useFormContext<CheckoutFormValues>();

    const watchedValues = watch(["firstName", "lastName", "email", "phone"]);
    const debouncedValues = useDebounce(watchedValues, 2000);

    useEffect(() => {
        const [firstName = "", lastName = "", email = "", phone = ""] = debouncedValues;
        const isValid =
            firstName.length >= 2 &&
            lastName.length >= 2 &&
            email.includes("@") &&
            isValidPhoneNumber(phone);

        if (isValid) {
            const currentData = savedPersonalInfo;
            const hasChanges =
                currentData?.firstName !== firstName ||
                currentData?.lastName !== lastName ||
                currentData?.email !== email ||
                currentData?.phone !== phone;

            if (hasChanges) {
                setPersonalInfo({ firstName, lastName, email, phone } as PersonalInfoForm);
            }
        }
    }, [debouncedValues, setPersonalInfo, savedPersonalInfo]);

    return (
        <div className={cn("bg-white rounded-[32px] p-4 shadow-sm", className)}>
            <FieldSet>
                <FieldLegend className="font-bold">
                    {title}
                </FieldLegend>

                <FieldGroup>
                    <div className="grid grid-cols-2 gap-4">
                        <Field>
                            <FieldLabel htmlFor="firstName">First name</FieldLabel>
                            <Input
                                id="firstName"
                                {...register("firstName")}
                                placeholder="Ivan"
                                autoComplete="given-name"
                                aria-invalid={!!errors.firstName}
                            />
                            {errors.firstName && <FieldError>{errors.firstName.message}</FieldError>}
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="lastName">Last name</FieldLabel>
                            <Input
                                id="lastName"
                                {...register("lastName")}
                                placeholder="Ivanovich"
                                autoComplete="family-name"
                                aria-invalid={!!errors.lastName}
                            />
                            {errors.lastName && <FieldError>{errors.lastName.message}</FieldError>}
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="email">Email address</FieldLabel>
                            <Input
                                id="email"
                                type="email"
                                {...register("email")}
                                placeholder="ivan.ivanovich@example.com"
                                autoComplete="email"
                                aria-invalid={!!errors.email}
                            />
                            {errors.email && <FieldError>{errors.email.message}</FieldError>}
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="phone">Phone number</FieldLabel>
                            <PhoneInput
                                id="phone"
                                {...register("phone")}
                                placeholder={formatPhoneNumber("+375291234567")}
                                autoComplete="tel"
                                aria-invalid={!!errors.phone}
                            />
                            {errors.phone && <FieldError>{errors.phone.message}</FieldError>}
                        </Field>
                    </div>
                </FieldGroup>
            </FieldSet>
        </div>
    );
};
