import { type PropsWithChildren } from "react";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import Wrapper from "@/components/ui/wrapper";
import SettingsSidebar from "@/components/settings/settings-sidebar";
import { getServerAuthSession } from "@/server/auth";
import LoginToView from "@/components/ui/login-to-view";

export default async function SettingsLayout({ children }: PropsWithChildren) {
  const session = await getServerAuthSession();
  if (!session?.user.email) {
    return <LoginToView />;
  }

  return (
    <div className="mx-2">
      <Wrapper className="mx-auto mb-6 mt-0 rounded-md px-2 pb-4 shadow-md dark:shadow-gray-800 sm:mt-6 sm:p-6 md:mt-10 md:p-8">
        <Heading
          title="Settings"
          subtitle="Manage your account settings and set e-mail preferences."
        />
        <Separator className="my-4 sm:my-6" />

        <div className="md:grid md:grid-cols-12">
          <section className="md:col-span-3">
            <SettingsSidebar />
          </section>

          <Separator className="my-4 block sm:my-6 sm:hidden" />

          <section className="md:col-span-6">{children}</section>

          <section className="hidden md:col-span-3 md:block" />
        </div>
      </Wrapper>
    </div>
  );
}
