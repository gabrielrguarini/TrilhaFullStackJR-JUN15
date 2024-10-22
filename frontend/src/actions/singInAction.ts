"use server";

import { singinSchema } from "@/schemas/singupSchema";

export async function singInAction(formData: FormData) {
  const body = {
    email: formData.get("email"),
    password: formData.get("password"),
    repassword: formData.get("repassword"),
  };
  const safeData = singinSchema.safeParse(body);
  if (!safeData.success) {
    console.log(safeData.error?.flatten().fieldErrors);
    // return safeData.error?.flatten().fieldErrors;
  }
  console.log("Ok");
}
