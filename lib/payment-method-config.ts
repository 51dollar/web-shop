import type { IconSvgElement } from "@hugeicons/react";

import {
  CreditCardIcon,
  MoneyExchange01Icon,
  Payment02Icon,
  Wallet02Icon,
} from "@hugeicons/core-free-icons";
import { PAYMENT_METHODS, type PaymentMethod } from "./payment-method";

export const PAYMENT_METHOD_CONFIG: Record<
  PaymentMethod,
  {
    label: string;
    description: string;
    icon: IconSvgElement;
  }
> = {
  [PAYMENT_METHODS.CARD_ONLINE]: {
    label: "Card Online",
    description: "Pay online using your bank card.",
    icon: CreditCardIcon,
  },

  [PAYMENT_METHODS.CASH_ON_DELIVERY]: {
    label: "Cash on Delivery",
    description: "Pay in cash when receiving your order.",
    icon: MoneyExchange01Icon,
  },

  [PAYMENT_METHODS.CARD_ON_DELIVERY]: {
    label: "Card on Delivery",
    description: "Pay by card using courier terminal upon delivery.",
    icon: Payment02Icon,
  },

  [PAYMENT_METHODS.INSTALLMENTS]: {
    label: "Installments",
    description: "Split your payment into monthly installments.",
    icon: Wallet02Icon,
  },
};
