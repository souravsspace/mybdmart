import PageTitle from "@/components/admin/page-title";
import Navbar from "@/components/admin/settings/navbar";
import { type PropsWithChildren } from "react";

export default async function SettingsLayout({ children }: PropsWithChildren) {
  return (
    <main className="flex w-full flex-col  gap-5">
      <PageTitle title="Settings" />
      <Navbar />

      <div>{children}</div>
    </main>
  );
}
