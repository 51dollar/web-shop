import type { Metadata } from "next";
import type { ReactNode } from 'react';
import { Header } from "@/components/features/header";

export const metadata: Metadata = {
  title: "Unibody",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: ReactNode;
  modal: ReactNode;
}>) {
  return (
    <main>
      <Header />
      {children}
      {modal}
    </main>
  );
}
