import { EditCategory } from "@/app/components/Category/EditCategory";
import { auth } from "@/auth";

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const session = await auth();
  const resCategory = await fetch(`${process.env.BACKEND_URL}/category/${id}`, {
    headers: {
      Authorization: `Bearer ${session?.access}`,
    },
  });
  const category = await resCategory.json();
  return <EditCategory category={category} />;
};
export default page;
