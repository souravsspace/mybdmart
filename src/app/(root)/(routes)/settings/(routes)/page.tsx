import SettingsSectionWrapper from "@/components/settings/settings-section-wrapper";
import { SettingsProfileForm } from "@/components/settings/settings-profile-form";
import { api } from "@/trpc/server";

export const revalidate = 0;

export default async function SettingsPage() {
  const data = await api.userFrontend.getProfileData.query();
  return (
    <SettingsSectionWrapper
      title="Profile"
      subtitle="This is how others will see you on the site."
    >
      <SettingsProfileForm name={data?.name} username={data?.username} />
    </SettingsSectionWrapper>
  );
}
