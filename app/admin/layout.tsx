import { auth } from "@/auth";
import MiniDrawer from "../components/Navigation/MiniDrawer";
import { redirect } from "next/navigation";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    redirect("/shop/signin");
  }
  return <MiniDrawer>{children}</MiniDrawer>;
};
export default layout;
