import { DeliveryAddressForm } from "@/components/settings/delivery-address-form";
import SettingsSectionWrapper from "@/components/settings/settings-section-wrapper";

export default function DeliveryAddress() {
  return (
    <SettingsSectionWrapper
      title="Delivery Address"
      subtitle="Customize your delivery address."
    >
      <DeliveryAddressForm />
    </SettingsSectionWrapper>
  );
}
