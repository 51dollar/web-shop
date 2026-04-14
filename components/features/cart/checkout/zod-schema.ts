import { z } from "zod";
import { isValidPhoneNumber } from "@/lib/phone";

export const personalInfoSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .refine(isValidPhoneNumber, "Please enter a valid phone number"),
});

export type PersonalInfoForm = z.infer<typeof personalInfoSchema>;

export const deliveryInfoSchema = z.object({
  address: z.string().min(5, "Address must be at least 5 characters"),
  comment: z.string().optional(),
  deliveryTime: z.string().min(1, "Please select delivery time"),
});

export type DeliveryInfoForm = z.infer<typeof deliveryInfoSchema>;

export const checkoutFormSchema = personalInfoSchema.merge(deliveryInfoSchema);

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;
