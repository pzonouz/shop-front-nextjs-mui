"use server";

import { auth } from "@/auth";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

const EditOrderAction = async (_prevState: any, formData: FormData) => {
  const session = await auth();
  const rawData = Object.fromEntries(formData);
  const res = await fetch(`${process.env.BACKEND_URL}/order/${rawData?.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${session?.access}`,
    },
    body: JSON.stringify({ ...rawData }),
  });
  if (res.ok) {
    revalidateTag("order");
    // BUG:Show Snackbar after order finnished
    if (rawData?.status == "pending") redirect("/shop");
    return { success: true };
  }
  const err = await res.json();
  return { error: err };
};

export { EditOrderAction };
