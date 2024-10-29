import { DeleteComponent } from "@/app/components/Shared/DeleteComponent";

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  return <DeleteComponent component="product" id={id} />;
};
export default page;
