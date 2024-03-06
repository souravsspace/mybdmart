import { type PropsWithChildren } from "react";
import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/footer";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </main>
  );
}
