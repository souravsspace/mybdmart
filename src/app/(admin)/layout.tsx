import SideNavbar from "@/components/admin/side-navbar";
import { cn } from "@/lib/utils";
import { type PropsWithChildren } from "react";

export const metadata = {
  title: "Admin Panel | MyBDmart",
};

export const revalidate = 0;

export default function AdminLayout({ children }: PropsWithChildren) {
  return (
    <main
      className={cn("flex min-h-screen w-full bg-white text-black ", {
        "debug-screens": process.env.NODE_ENV === "development",
      })}
    >
      <SideNavbar />
      <div className="w-full p-8">{children}</div>
    </main>
  );
}
