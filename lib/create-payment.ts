import type { PaymentData } from "@/app/types/yookassa";
import axios from "axios";

interface Props {
  id: number;
  totalAmount: number;
  description: string;
}

export async function CreatePayment(details: Props) {
  try {
    const shopId = validateEnvVar(
      process.env.YOOKASSA_SHOP_ID,
      "YOOKASSA_SHOP_ID",
    );
    const apiKey = validateEnvVar(
      process.env.YOOKASSA_API_KEY,
      "YOOKASSA_API_KEY",
    );
    const returnUrl = validateEnvVar(
      process.env.YOOKASSA_CALLBACK_URL,
      "YOOKASSA_CALLBACK_URL",
    );

    const response = await axios.post<PaymentData>(
      "https://api.yookassa.ru/v3/payments",
      {
        amount: {
          value: details.totalAmount.toFixed(2),
          currency: "RUB",
        },
        capture: true,
        description: details.description,
        metadata: { orderId: details.id },
        confirmation: {
          type: "redirect",
          return_url: returnUrl,
        },
      },
      {
        auth: {
          username: shopId,
          password: apiKey,
        },
        headers: {
          "Idempotence-Key": crypto.randomUUID(),
        },
      },
    );

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("YooKassa error:", error);
    if (axios.isAxiosError(error)) {
      console.error("YooKassa response:", error.response?.data);

      return {
        success: false,
        error:
          error.response?.data?.description ||
          error.response?.data?.message ||
          "YooKassa failed to create payment",
      };
    }
    return {
      success: false,
      error: error,
    };
  }
}

function validateEnvVar(value: string | undefined, name: string): string {
  if (!value || value.trim() === "") {
    console.error(`Configuration YooKassa is missing or empty: ${name}`);
    throw new Error("YooKassa failed to create payment");
  }
  return value;
}
