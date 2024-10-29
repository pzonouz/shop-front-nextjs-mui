import { EditCategory } from "@/app/components/Category/EditCategory";

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const resCategory = await fetch(`${process.env.BACKEND_URL}/category/${id}`);
  const category = await resCategory.json();
  return <EditCategory category={category} />;
};
export default page;
