"use server";
import { revalidatePath } from "next/cache";
import * as z from "zod";
const schema = z.object({
  title: z.string().min(1),
});

const AddCategoryAction = async (_prevState: any, formData: FormData) => {
  const rawData = Object.fromEntries(formData);
  const validatedData = schema.safeParse(rawData);
  if (validatedData?.error) {
    return { error: validatedData?.error.flatten(), data: rawData };
  }
  const res = await fetch(`${process.env.BACKEND_URL}/category`, {
    method: "POST",
    body: JSON.stringify({ ...validatedData.data }),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (res.ok) {
    revalidatePath("/admin/category");
    return { success: {} };
  }
  const data = await res.json();
  const err = {
    formErrors: JSON.stringify(data.message),
    data: rawData,
  };
  return { error: err, data: rawData };
};
const EditCategoryAction = async (_prevState: any, formData: FormData) => {
  const rawData = Object.fromEntries(formData);
  const validatedData = schema.safeParse(rawData);
  if (validatedData?.error) {
    return { error: validatedData?.error.flatten(), data: rawData };
  }
  const res = await fetch(
    `${process.env.BACKEND_URL}/category/${rawData?.id}`,
    {
      method: "PATCH",
      body: JSON.stringify({ ...validatedData.data }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
  );
  if (res.ok) {
    revalidatePath("/admin/category");
    return { success: {} };
  }
  const data = await res.json();
  const err = {
    formErrors: JSON.stringify(data.message),
    data: rawData,
  };
  return { error: err, data: rawData };
};
export { AddCategoryAction, EditCategoryAction };
