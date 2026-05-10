import { Header } from "@/components/features/header";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Payment",
  description: "Complete your purchase in Unibody store",
}

export default function PaymentLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <main className="min-h-screen bg-gray-200">
      <Header hasSearch={false} hasCart={false} buttonVariant="outlineBlack" className="border-0" />
      {children}
    </main>
  );
}
