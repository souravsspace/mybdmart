import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { TRPCReactProvider } from "@/trpc/react";
import ToastProvider from "@/components/provider/toast-provider";
import NextAuthProvider from "@/components/provider/next-auth-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "MyBDmart | Shop Online in Bangladesh",
  description: "MyBDmart is a marketplace for buying products.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`bg-gray-50 font-sans ${inter.variable}`}>
        <NextAuthProvider>
          <ToastProvider />
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
