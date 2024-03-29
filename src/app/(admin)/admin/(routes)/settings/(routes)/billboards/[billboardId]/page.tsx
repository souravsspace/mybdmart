import BillboardForm from "@/components/admin/billboard/billboard-form";
import { api } from "@/trpc/server";

type Props = {
  params: {
    billboardId: string;
  };
};

export const revalidate = 0;

export default async function Billboard({ params: { billboardId } }: Props) {
  const billboard = await api.billboard.getBillboard.query({ id: billboardId });

  return <BillboardForm initialData={billboard} />;
}
