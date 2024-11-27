import { ProfileComponent } from "@/app/components/User/Profile";
import { auth } from "@/auth";

const page = async () => {
  const session = await auth();
  const resUser = await fetch(`${process.env.BACKEND_URL}/auth/user`, {
    headers: {
      Authorization: `Bearer ${session?.access}`,
      Accept: "application/json",
    },
  });
  const user = await resUser.json();
  return <ProfileComponent user={user} />;
};

export default page;
