"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const Logout = async () => {
  (await cookies()).delete("token");
  redirect("/singin");
};
