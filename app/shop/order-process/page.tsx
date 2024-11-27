import { OrderProcessComponent } from "@/app/components/order/OrderProcess";
import { auth } from "@/auth";

const page = async () => {
  const session = await auth();
  const resUser = await fetch(`${process.env.BACKEND_URL}/auth/user`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.access}`,
      Accept: "application/json",
    },
    next: {
      tags: ["user", "order"],
    },
  });

  const user = await resUser.json();
  return (
    <OrderProcessComponent
      order={
        user?.orders?.filter((order: any) => order?.status == "unapproved")?.[0]
      }
      user={user}
    />
  );
};

export default page;
