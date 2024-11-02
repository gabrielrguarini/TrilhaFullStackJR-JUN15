import { ProjectSchema } from "@/schemas/projectSchema";
import { FieldValues } from "react-hook-form";

export const deleteProjectById = async (
  id: string,
  token: string,
): Promise<
  | { id: number; title: string; body: string; userId: number }
  | { error: string }
> => {
  const response = await fetch(`http://localhost:3333/project/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
};

export const getProjectsByToken = async (token: string) => {
  const response = await fetch(`http://localhost:3333/projects`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "GET",
  });
  const resData = await response.json();
  return resData;
};

export const getProjectById = async (
  id: string,
  token: string,
): Promise<ProjectSchema> => {
  const response = await fetch(`http://localhost:3333/project/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "GET",
  });
  const resData = await response.json();
  return resData;
};

export const createProjectById = async (token: string, data: FieldValues) => {
  const response = await fetch(`http://localhost:3333/project`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
    method: "POST",
  });
  return await response.json();
};
export const editProjectById = async (
  id: string,
  token: string,
  data: FieldValues,
) => {
  const response = await fetch(`http://localhost:3333/project/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
    method: "PUT",
  });
  return await response.json();
};
