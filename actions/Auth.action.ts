"use server";

import { auth, signIn } from "@/auth";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import * as z from "zod";
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});
const SigninAction = async (_prevState: any, formData: FormData) => {
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
  redirect("/shop");
};

const signupSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .regex(
        /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/,
        {
          message:
            "Should have 1 lowercase letter, 1 uppercase letter, 1 number, 1 special character and be at least 8 characters long",
        },
      ),
    password_confirmation: z.string().min(1),
  })
  .superRefine((value, ctx) => {
    if (value.password !== value.password_confirmation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["password_confirmation"],
      });
    }
  });
const SignupAction = async (_prevState: any, formData: FormData) => {
  const rawData = Object.fromEntries(formData);
  const validatedData = signupSchema.safeParse(rawData);
  if (validatedData?.error) {
    return { error: validatedData?.error.flatten(), data: rawData };
  }
  const res = await fetch(`${process.env.BACKEND_URL}/auth/signup/`, {
    method: "POST",
    body: JSON.stringify({ ...validatedData.data }),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (res.ok) {
    await signIn("credentials", {
      ...validatedData.data,
      redirect: false,
    });
    redirect("/shop");
  }
  const data = await res.json();
  const err = {
    formErrors: JSON.stringify(data.message),
  };
  return { error: err, data: rawData };
};

const EditUserAction = async (_prevState: any, formData: FormData) => {
  const session = await auth();
  const rawData = Object.fromEntries(formData);
  const res = await fetch(`${process.env.BACKEND_URL}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${session?.access}`,
    },
    body: JSON.stringify({ ...rawData }),
  });
  if (res.ok) {
    revalidateTag("user");
    return { success: {} };
  }
  const err = await res.json();
  return { error: err };
};

export { SigninAction, SignupAction, EditUserAction };
