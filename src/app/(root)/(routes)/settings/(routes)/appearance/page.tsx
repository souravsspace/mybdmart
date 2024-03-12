import SettingsSectionWrapper from "@/components/settings/settings-section-wrapper";
import { AppearanceForm } from "@/components/settings/appearance-form";

export const revalidate = 0;

export default function AppearancePage() {
  return (
    <SettingsSectionWrapper
      title="Appearance"
      subtitle="Customize the appearance of the app. Automatically switch between day and night themes."
    >
      <AppearanceForm />
    </SettingsSectionWrapper>
  );
}
