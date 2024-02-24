export type SizeAndColor = {
  id: string;
  name: string;
  value: string;
};

export type Categories = {
  id: string;
  name: string;
};

export type Image = {
  imageUrl: string;
};

// export type Category = {
//   name: string;
// };

export type productType = {
  id: string;
  name: string;
  price: number;
  newPrice: number | null;
  description: string;
  isArchived: boolean;
  isFeatured: boolean;
  // categories: Category[];
  sizes: SizeAndColor[];
  colors: SizeAndColor[];
  category: string | undefined;
  categoryId: string | undefined;
  // size: string | undefined;
  // sizeId: string | undefined;
  // color: string | undefined;
  // colorId: string | undefined;
  images: Image[];
  updatedAt: Date;
};
