import SideNavbar from "@/components/admin/side-navbar";
import { cn } from "@/lib/utils";
import { getServerAuthSession } from "@/server/auth";
import { ROLE } from "@prisma/client";
import { redirect } from "next/navigation";
import { type PropsWithChildren } from "react";

export const metadata = {
  title: "Admin Panel | MyBDmart",
};

export const revalidate = 0;

export default async function AdminLayout({ children }: PropsWithChildren) {
  const session = await getServerAuthSession();

  if (session?.user.role == ROLE.USER) {
    redirect("/");
  }

  return (
    <main
      className={cn(
        "flex min-h-screen w-full flex-col bg-white text-black md:flex-row ",
        {
          "debug-screens": process.env.NODE_ENV === "development",
        },
      )}
    >
      <SideNavbar />
      <div className="w-full p-8">{children}</div>
    </main>
  );
}
