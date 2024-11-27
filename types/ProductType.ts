import { ImageType } from "./ImageType";

export type ProductType = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  description: string;
  category_id: string;
  images: ImageType[];
  created_at: Date;
  updated_at: Date;
};
