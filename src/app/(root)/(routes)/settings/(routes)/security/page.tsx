import SettingsSectionWrapper from "@/components/settings/settings-section-wrapper";
import { SecurityForm } from "@/components/settings/security-form";

export default function SecurityPage() {
  return (
    <SettingsSectionWrapper
      title="Security"
      subtitle="Update your password and rest your account password here."
    >
      <SecurityForm />
    </SettingsSectionWrapper>
  );
}
