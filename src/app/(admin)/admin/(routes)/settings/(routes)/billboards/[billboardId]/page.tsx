import BillboardForm from "@/components/admin/settings/billboard-form";
import { api } from "@/trpc/server";

type Props = {
  params: {
    billboardId: string;
  };
};

export default async function Billboard({ params: { billboardId } }: Props) {
  const billboard = await api.billboard.getBillboard.query({ id: billboardId });

  return <BillboardForm initialData={billboard} />;
}
