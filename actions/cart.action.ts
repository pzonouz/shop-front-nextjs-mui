"use server";
import { auth } from "@/auth";
import { revalidateTag } from "next/cache";

async function AddToCartAction(_prevState: any, formData: FormData) {
  try {
    const session = await auth();
    const res = await fetch(`${process.env.BACKEND_URL}/order`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.access}`,
      },
    });
    const Order = await res.json();
    const res2 = await fetch(`${process.env.BACKEND_URL}/order_record`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.access}`,
      },
      body: JSON.stringify({
        order_id: Order?.id,
        product_id: formData.get("product_id"),
        quantity: formData.get("quantity"),
        price: formData.get("price"),
      }),
    });
    if (res2.ok) {
      revalidateTag("order");
      return {
        success: true,
      };
    }
  } catch (e) {
    return { error: e };
  }
}

async function EditCartItem(_prevState: any, formData: FormData) {
  const session = await auth();
  await fetch(`${process.env.BACKEND_URL}/order_record/${formData.get("id")}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.access}`,
    },
    body: JSON.stringify({ quantity: formData.get("quantity") }),
  });
  revalidateTag("order");
  return;
}
async function DeleteCartItem(_prevState: any, formData: FormData) {
  const session = await auth();
  await fetch(`${process.env.BACKEND_URL}/order_record/${formData.get("id")}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.access}`,
    },
  });
  revalidateTag("order");
  return;
}
export { AddToCartAction, EditCartItem, DeleteCartItem };
