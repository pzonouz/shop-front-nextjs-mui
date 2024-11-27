import { auth } from "@/auth";
import { ResponsiveAppBar } from "../components/Navigation/Appbar";
import { redirect } from "next/navigation";

export default async function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (session?.user?.isAdmin) {
    redirect("/admin");
  }
  return (
    <>
      <ResponsiveAppBar />
      {children}
    </>
  );
}
