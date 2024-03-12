import { DeliveryAddressForm } from "@/components/settings/delivery-address-form";
import SettingsSectionWrapper from "@/components/settings/settings-section-wrapper";
import { api } from "@/trpc/server";

export const revalidate = 0;

export default async function DeliveryAddress() {
  const { userDeliveryAddress } =
    await api.deliveryAddress.getDeliveryAddress.query();

  return (
    <SettingsSectionWrapper
      title="Delivery Address"
      subtitle="Customize your delivery address."
    >
      <DeliveryAddressForm {...userDeliveryAddress} />
    </SettingsSectionWrapper>
  );
}
