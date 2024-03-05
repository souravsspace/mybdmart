import ColorForm from "@/components/admin/color/color-form";
import { api } from "@/trpc/server";

type Props = {
  params: {
    colorId: string;
  };
};

export const revalidate = 0;

export default async function Color({ params: { colorId } }: Props) {
  const color = await api.color.getColor.query({ id: colorId });

  return <ColorForm initialData={color} />;
}
