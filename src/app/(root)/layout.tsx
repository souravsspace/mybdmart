import { type PropsWithChildren } from "react";
import Navbar from "@/components/navigation/navbar";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
