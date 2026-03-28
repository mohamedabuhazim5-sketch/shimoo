import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import WhatsAppFloat from "@/components/layout/whatsapp-float";
import ToasterProvider from "@/components/providers/toaster-provider";

export const metadata: Metadata = {
  title: "shemoo",
  description: "متجر صواني خطوبة وورد أفراح ومستلزمات العروسة",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-[#fff8fb] text-stone-900">
        <Header />
        <main className="mx-auto min-h-screen max-w-7xl px-4 py-8">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <ToasterProvider />
      </body>
    </html>
  );
}