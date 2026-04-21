import type { DeliveryTime } from "@/lib/generated/prisma-client/client";

export const DELIVERY_TIME_MAP: Record<DeliveryTime, string> = {
    MORNING: "09:00 - 12:00",
    AFTERNOON: "12:00 - 15:00",
    EVENING: "15:00 - 18:00",
    NIGHT: "18:00 - 21:00",
};

export const DELIVERY_OPTIONS = Object.entries(DELIVERY_TIME_MAP) as [
    DeliveryTime,
    string
][];