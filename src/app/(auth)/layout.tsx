import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import { type PropsWithChildren } from "react";

export default async function AuthLayout({ children }: PropsWithChildren) {
  const session = await getServerAuthSession();

  if (session) {
    redirect("/");
  }

  return (
    <main className="mx-auto flex h-screen w-full items-center justify-center p-2 sm:p-4 md:p-6">
      {children}
    </main>
  );
}
