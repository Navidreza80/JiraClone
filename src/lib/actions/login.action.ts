/* eslint-disable */

"use server";

import z from "zod";

export default async function loginAction(prevState: any, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const schema = z.object({
    email: z.email().nonempty(),
    password: z.string().nonempty(),
  });

  const data = schema.parse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  try {
    return {
      ...data,
      message: "Login done successfully",
      success: true,
    };
  } catch {
    return {
      ...data,
      message: "Failed to login",
      success: false,
    };
  }
}
