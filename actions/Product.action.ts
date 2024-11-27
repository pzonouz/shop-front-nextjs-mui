"use server";
import { auth } from "@/auth";
import { revalidatePath, revalidateTag } from "next/cache";
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
  const session = await auth();
  if (validatedData?.error) {
    return { error: validatedData?.error.flatten(), data: rawData };
  }
  const res = await fetch(`${process.env.BACKEND_URL}/product`, {
    method: "POST",
    body: JSON.stringify({ ...validatedData.data }),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${session?.access}`,
    },
  });
  if (res.ok) {
    const product = await res.json();
    formData.append("product_id", product.id);
    const image = formData.get("image") as File;
    if (image.size > 0) {
      const fileRes = await fetch(`${process.env.BACKEND_URL}/image`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${session?.access}`,
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
  const session = await auth();
  if (validatedData?.error) {
    return { error: validatedData?.error.flatten(), data: rawData };
  }
  const res = await fetch(`${process.env.BACKEND_URL}/product/${rawData?.id}`, {
    method: "PATCH",
    body: JSON.stringify({ ...validatedData.data }),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${session?.access}`,
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
const AddImageAction = async (_product: any, formData: FormData) => {
  const product_id = formData.get("product_id");
  formData.append("product_id", product_id as string);
  const image = formData.get("image") as File;
  if (image) {
    const session = await auth();
    const fileRes = await fetch(`${process.env.BACKEND_URL}/image`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${session?.access}`,
      },
      method: "POST",
      body: formData,
    });
    if (fileRes.ok) {
      revalidatePath(`/admin/product`);
      revalidatePath(`/admin/product/${product_id}/edit`);
    }
  }
};
const DeleteImageAction = async (imageId: string, productId: string) => {
  const session = await auth();
  const res = await fetch(`${process.env.BACKEND_URL}/image/${imageId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.access}`,
    },
  });
  if (res.ok) {
    revalidatePath(`/admin/product`);
    revalidatePath(`/admin/product/${productId}/edit`);
  }
};

export {
  AddProductAction,
  EditProductAction,
  AddImageAction,
  DeleteImageAction,
};
