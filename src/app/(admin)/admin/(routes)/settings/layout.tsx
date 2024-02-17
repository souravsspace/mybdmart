import PageTitle from "@/components/admin/page-title";
import Breadcrumb from "@/components/admin/settings/breadcrumb";
import { type PropsWithChildren } from "react";

export default function SettingsLayout({ children }: PropsWithChildren) {
  return (
    <main className="flex w-full flex-col  gap-5">
      <PageTitle title="Settings" />
      <Breadcrumb />

      <div>{children}</div>
    </main>
  );
}
