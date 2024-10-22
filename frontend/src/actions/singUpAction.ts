"use server";

import { singupSchema } from "@/schemas/singupSchema";

export async function singUpAction(formData: FormData) {
  const body = {
    email: formData.get("email"),
    password: formData.get("password"),
    repassword: formData.get("repassword"),
  };
  const safeData = singupSchema.safeParse(body);
  if (!safeData.success) {
    console.log(safeData.error?.flatten().fieldErrors);
    // return safeData.error?.flatten().fieldErrors;
  }
  console.log("Ok");
}
