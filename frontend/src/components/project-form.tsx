"use client";
import { projectSchema, ProjectSchema } from "@/schemas/projectSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { Input } from "./input";
import { ErrorMessage } from "@hookform/error-message";

export const ProjectForm = ({
  onSubmit,
  defaultValues,
}: {
  onSubmit: (data: FieldValues) => Promise<void>;
  defaultValues?: ProjectSchema;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectSchema>({
    resolver: zodResolver(projectSchema),
    defaultValues: defaultValues,
  });
  if (!defaultValues) return null;
  return (
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
        className="mt-4 rounded-full bg-primary p-2 text-black"
        type="submit"
      >
        {defaultValues ? "Editar Projeto" : "Criar Projeto"}
      </button>
    </form>
  );
};
