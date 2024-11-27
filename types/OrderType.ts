import { OrderRecordType } from "./OrderRecordType";

export type OrderType = {
  id: string;
  status: string;
  records: OrderRecordType[];
  created_at: Date;
  updated_at: Date;
};
