import { OrderType } from "./OrderType";

export type UserType = {
  firstname: string;
  lastname: string;
  address: string;
  orders: OrderType[];
  created_at: Date;
  updated_at: Date;
};
