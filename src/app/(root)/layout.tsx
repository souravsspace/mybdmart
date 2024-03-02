import { type PropsWithChildren } from "react";
import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/footer";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
