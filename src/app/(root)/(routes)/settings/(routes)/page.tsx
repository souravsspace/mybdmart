import SettingsSectionWrapper from "@/components/settings/settings-section-wrapper";
import { SettingsProfileForm } from "@/components/settings/settings-profile-form";

export default function SettingsPage() {
  return (
    <SettingsSectionWrapper
      title="Profile"
      subtitle="This is how others will see you on the site."
    >
      <SettingsProfileForm />
    </SettingsSectionWrapper>
  );
}
