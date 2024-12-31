"use server";
import { CreateProjectForm } from "@/components/create-project-form";
import { Toast } from "@/components/toast";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Project() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (!token?.value) {
    redirect("/");
  }
  return (
    <div className="flex w-full flex-1 items-center justify-center">
      <CreateProjectForm token={token.value} />
    </div>
  );
}
