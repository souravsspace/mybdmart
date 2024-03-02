import SizeForm from "@/components/admin/size/size-form";
import { api } from "@/trpc/server";

type Props = {
  params: {
    sizeId: string;
  };
};

export const revalidate = 0;

export const getServerSideProps = async ({ params }: Props) => {
  const sizeId = params?.sizeId;
  return {
    props: {
      sizeId,
    },
  };
};

export default async function Size({ params: { sizeId } }: Props) {
  const size = await api.size.getSize.query({ id: sizeId });

  return <SizeForm initialData={size} />;
}
