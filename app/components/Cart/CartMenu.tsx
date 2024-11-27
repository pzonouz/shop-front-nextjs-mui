"use server";

import { auth } from "@/auth";
import { CartPopOver } from "./CartPopover";
import { OrderRecordType } from "@/types/OrderRecordType";
import { OrderType } from "@/types/OrderType";

const CartMenu = async () => {
  const session = await auth();
  const resOrders = await fetch(`${process.env.BACKEND_URL}/order`, {
    next: { tags: ["order"] },
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${session?.access}`,
    },
  });
  const orders = await resOrders.json();
  if (orders.length === 0 || !Array.isArray(orders)) return null;
  const activeOrder: OrderType = orders?.find(
    (order: any) => order.status === "unapproved",
  );
  if (!activeOrder || activeOrder?.records?.length === 0) return null;
  const orderRecords: OrderRecordType[] = activeOrder.records;
  return <CartPopOver orderRecords={orderRecords} />;
};
export { CartMenu };
