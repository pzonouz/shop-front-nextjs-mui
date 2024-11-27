import { OrderType } from "./OrderType";
import { ProductType } from "./ProductType";

export type OrderRecordType = {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
  product: ProductType;
  order: OrderType;
};
