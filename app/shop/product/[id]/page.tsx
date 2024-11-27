"use server";

import { ProductDetail } from "@/app/components/Product/ProductDetail";
import { auth } from "@/auth";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const parameters = await params;
  const session = await auth();
  const resProduct = await fetch(
    `${process.env.BACKEND_URL}/product/${parameters?.id}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorizarion: `Bearer ${session?.access}`,
      },
    },
  );
  const product = await resProduct.json();
  return <ProductDetail product={product} />;
};

export default page;
