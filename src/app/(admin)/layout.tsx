import SideNavbar from "@/components/admin/side-navbar";
import { ModeToggle } from "@/components/theme/mode-toggle";
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

  if (session?.user.role == ROLE.USER || !session) {
    redirect("/");
  }

  return (
    <main
      className={cn(
        "flex min-h-screen w-full flex-col bg-white text-black dark:bg-black dark:text-white md:flex-row",
        {
          "debug-screens": process.env.NODE_ENV === "development",
        },
      )}
    >
      <SideNavbar />

      <div className="w-full p-4 sm:p-6 md:p-8">{children}</div>

      <div className="fixed bottom-4 right-4 z-50">
        <ModeToggle />
      </div>
    </main>
  );
}
