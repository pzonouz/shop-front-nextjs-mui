import { EditProduct } from "@/app/components/Product/EditProduct";
import { auth } from "@/auth";

const page = async ({ params }: { params: any }) => {
  const { id } = await params;
  const session = await auth();
  const resCategories = await fetch(`${process.env.BACKEND_URL}/category`, {
    headers: {
      Authorization: `Bearer ${session?.access}`,
      Accept: "application/json",
    },
  });
  const categories = await resCategories.json();
  const resProduct = await fetch(`${process.env.BACKEND_URL}/product/${id}`, {
    headers: {
      Authorization: `Bearer ${session?.access}`,
      Accept: "application/json",
    },
  });
  const product = await resProduct.json();
  return <EditProduct product={product} categories={categories} />;
};
export default page;
