"use server";
import { revalidatePath } from "next/cache";
import * as z from "zod";
const schema = z.object({
  id: z.string().nullish(),
  title: z.string().min(1),
  description: z.string().min(1),
  price: z.string().nullish(),
  category_id: z.string().min(1),
  image: z.any().nullish(),
  quantity: z.string().nullish(),
});

const AddProductAction = async (_prevState: any, formData: FormData) => {
  const rawData = Object.fromEntries(formData);
  const validatedData = schema.safeParse(rawData);
  if (validatedData?.error) {
    return { error: validatedData?.error.flatten(), data: rawData };
  }
  const res = await fetch(`${process.env.BACKEND_URL}/product`, {
    method: "POST",
    body: JSON.stringify({ ...validatedData.data }),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (res.ok) {
    const product = await res.json();
    console.log(product);
    formData.append("product_id", product.id);
    const image = formData.get("image") as File;
    if (image) {
      const fileRes = await fetch(`${process.env.BACKEND_URL}/image`, {
        headers: {
          Accept: "application/json",
        },
        method: "POST",
        body: formData,
      });
      if (!fileRes.ok) {
        return {
          error: { formErrors: "Image upload failed" },
          data: rawData,
        };
      }
    }
    revalidatePath("/admin/product");
    return { success: {} };
  }
  const data = await res.json();
  const err = {
    formErrors: JSON.stringify(data.message),
    data: rawData,
  };
  return { error: err, data: rawData };
};
const EditProductAction = async (_prevState: any, formData: FormData) => {
  const rawData = Object.fromEntries(formData);
  const validatedData = schema.safeParse(rawData);
  if (validatedData?.error) {
    return { error: validatedData?.error.flatten(), data: rawData };
  }
  const res = await fetch(`${process.env.BACKEND_URL}/product/${rawData?.id}`, {
    method: "PATCH",
    body: JSON.stringify({ ...validatedData.data }),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (res.ok) {
    revalidatePath("/admin/product");
    return { success: {} };
  }
  const data = await res.json();
  const err = {
    formErrors: JSON.stringify(data.message),
    data: rawData,
  };
  return { error: err, data: rawData };
};
export { AddProductAction, EditProductAction };
