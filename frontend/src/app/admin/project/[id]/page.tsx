"use server";
import { cookies } from "next/headers";
import { ProjectForm } from "@/components/edit-project-form";
import { getProjectById } from "@/services/project";
import { Suspense } from "react";
import { redirect } from "next/navigation";

export default async function Project({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  const { id } = await params;

  if (!token?.value) {
    redirect("/");
  }
  return (
    <div className="flex w-full flex-1 items-center justify-center">
      <Suspense fallback={"Carregando..."}>
        <ProjectForm
          token={token.value}
          id={id}
          defaultValues={getProjectById(id, token.value)}
        />
      </Suspense>
    </div>
  );
}
