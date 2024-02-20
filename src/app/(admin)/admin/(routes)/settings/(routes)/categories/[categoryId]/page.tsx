import { api } from "@/trpc/server";
import CategoryForm from "@/components/admin/category/catagory-form";

type Props = {
  params: {
    categoryId: string;
  };
};

export const revalidate = 0;

export default async function Category({ params: { categoryId } }: Props) {
  const category = await api.category.getCategory.query({ id: categoryId });

  return <CategoryForm initialData={category} />;
}
