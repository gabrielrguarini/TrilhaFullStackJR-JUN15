"use client";
import { FieldValues } from "react-hook-form";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { ProjectForm } from "@/components/project-form";
import useSWR from "swr";
import { getProjectById } from "@/services/project";
import { Suspense } from "react";

export default function Project() {
  const { id } = useParams<{ id: string }>();
  const token = Cookies.get("token");

  const router = useRouter();
  const { data, error, isLoading } = useSWR(
    token ? `project/${id}` : null,
    () => getProjectById(id, token!),
  );

  const onSubmit = async (data: FieldValues) => {
    const token = Cookies.get("token");
    const response = await fetch("http://localhost:3333/project", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
      method: "POST",
    });
    const resData = await response.json();
    router.push(`/project/${resData.project.id}`);
  };
  if (!token) {
    router.push("/");
    return;
  }
  if (error) return null;
  if (isLoading) return null;
  if (!data) return null;
  return (
    <div className="flex w-full flex-1 items-center justify-center">
      <ProjectForm onSubmit={onSubmit} defaultValues={data} />
    </div>
  );
}
