import { EditProduct } from "@/app/components/Product/EditProduct";

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const resCategories = await fetch(`${process.env.BACKEND_URL}/category`);
  const categories = await resCategories.json();
  const resProduct = await fetch(`${process.env.BACKEND_URL}/product/${id}`);
  const product = await resProduct.json();
  return <EditProduct product={product} categories={categories} />;
};
export default page;
