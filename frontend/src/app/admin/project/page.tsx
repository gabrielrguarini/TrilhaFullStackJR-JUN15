"use client";
import { FieldValues } from "react-hook-form";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { ProjectForm } from "@/components/project-form";

export default function Project() {
  const router = useRouter();
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
    router.push(`/admin/project/${resData.project.id}`);
  };
  return (
    <div className="flex w-full flex-1 items-center justify-center">
      <ProjectForm onSubmit={onSubmit} />
    </div>
  );
}
