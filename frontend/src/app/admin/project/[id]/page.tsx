"use client";

import { Input } from "@/components/input";
import { projectSchema } from "@/schemas/projectSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import type { ProjectSchema } from "@/schemas/projectSchema";
import { ErrorMessage } from "@hookform/error-message";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useParams } from "next/navigation";

export default function Project() {
  const { id } = useParams();
  useEffect(() => {
    const data = async () => {
      const token = Cookies.get("token");
      const response = await fetch(`http://localhost:3333/project/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "GET",
      });
      if (!response.ok) {
        router.push("/projects");
      }
      const resData = await response.json();
      if (!resData) {
        router.push("/projects");
      }
      setValue("body", resData.body);
      setValue("title", resData.title);
    };
    data();
  });
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProjectSchema>({
    resolver: zodResolver(projectSchema),
  });
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
    reset();
    router.push(`/project/${resData.project.id}`);
  };
  return (
    <div className="flex w-full flex-1 items-center justify-center">
      <form
        method="GET"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
        <div className="flex flex-col">
          <label htmlFor="title">Título</label>
          <Input type="text" {...register("title")} className="mt-0" />
          {errors.title && (
            <span>
              <ErrorMessage errors={errors} name="title" />
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <label>Conteúdo</label>
          <textarea
            className="rounded-2xl border-2 border-primary bg-transparent p-1 px-4"
            contentEditable
            cols={40}
            spellCheck={true}
            rows={16}
            {...register("body")}
            style={{ scrollbarWidth: "none" }}
          />
          {errors.body && (
            <span>
              <ErrorMessage errors={errors} name="body" />
            </span>
          )}
        </div>
        <button
          className="mt-4 rounded-full border-2 border-white"
          type="submit"
        >
          Editar
        </button>
      </form>
    </div>
  );
}
