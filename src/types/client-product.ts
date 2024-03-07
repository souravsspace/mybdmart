import { type STOCK } from "@prisma/client";

export type SizeColorType = {
  id: string;
  name: string;
  value?: string;
};

export type Images = {
  imageUrl: string;
};

export type ClientProductType = {
  id: string;
  name: string;
  description?: string;
  price: number;
  newPrice: number | null;
  categoryName: string;
  categoryId: string;
  sizes: SizeColorType[];
  colors: SizeColorType[];
  images: Images[];
  stock: STOCK;
  sell: number;
  createdAt?: Date;
};
