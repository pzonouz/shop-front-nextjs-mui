"use server";

import { signIn } from "@/auth";
import { redirect } from "next/navigation";
import * as z from "zod";
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});
const signinAction = async (_prevState: any, formData: FormData) => {
  const rawData = Object.fromEntries(formData);
  const validatedData = schema.safeParse(rawData);
  if (validatedData?.error) {
    return { error: validatedData?.error.flatten(), data: rawData };
  }

  try {
    await signIn("credentials", {
      ...validatedData.data,
      redirect: false,
    });
  } catch (err) {
    return {
      error: { formErrors: "Email and password not match" },
      data: rawData,
    };
  }
  redirect("/");
};
export { signinAction };
