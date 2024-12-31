"use client";
import { projectSchema, ProjectSchema } from "@/schemas/projectSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { Input } from "./input";
import { ErrorMessage } from "@hookform/error-message";

import { createProjectById } from "@/services/project";
import { useToast } from "@/context/ToastContext";

export const CreateProjectForm = ({ token }: { token: string }) => {
  const showToast = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectSchema>({
    resolver: zodResolver(projectSchema),
  });

  const onSubmit = async (data: FieldValues) => {
    try {
      await createProjectById(token, data);
      reset();
      showToast({ message: "Projeto criado com sucesso." });
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
    }
  };
  return (
    <form
      method="GET"
      onSubmit={handleSubmit((formData) => onSubmit(formData))}
      className="flex flex-col gap-2"
    >
      <div className="flex flex-col">
        <label htmlFor="title" className="-mb-4">
          Título
        </label>
        <Input type="text" {...register("title")} className="mt-0" />
        {errors.title && (
          <span>
            <ErrorMessage errors={errors} name="title" />
          </span>
        )}
      </div>
      <div className="flex flex-col">
        <label htmlFor="body">Conteúdo</label>
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
        className="mt-4 rounded-full bg-primary p-2 text-white transition-all duration-300 hover:bg-black"
        type="submit"
      >
        Criar Projeto
      </button>
    </form>
  );
};
