"use client";
import { FieldValues, useForm } from "react-hook-form";
import type { ProjectSchema } from "@/schemas/projectSchema";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ProjectForm } from "@/components/project-form";

export default function Project() {
  const { id } = useParams();
  const [data, setData] = useState<ProjectSchema>();
  useEffect(() => {
    const data = async () => {
      const token = Cookies.get("token");
      const response = await fetch(`http://localhost:3333/project/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "GET",
        cache: "force-cache",
      });
      if (!response.ok) {
        router.push("/projects");
      }
      const resData: ProjectSchema = await response.json();
      if (!resData) {
        router.push("/projects");
      }
      return resData;
    };
    const defData = async () => {
      setData(await data());
    };
    defData();
  });
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
    router.push(`/project/${resData.project.id}`);
  };
  return (
    <div className="flex w-full flex-1 items-center justify-center">
      <ProjectForm onSubmit={onSubmit} defaultValues={data} />
    </div>
  );
}
