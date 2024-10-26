"use server";
import * as z from "zod";

const schema = z
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
  const validatedData = schema.safeParse(rawData);
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
    return { success: {} };
  }
  const data = await res.json();
  const err = {
    formErrors: JSON.stringify(data.message),
  };
  return { error: err, data: rawData };
};
export { SignupAction };
