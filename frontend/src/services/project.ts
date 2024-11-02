import { ProjectSchema } from "@/schemas/projectSchema";
import { FieldValues } from "react-hook-form";

export const deleteProjectById = async (id: number, token: string) => {
  const response = await fetch(`http://localhost:3333/project/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const resData = await response.json();
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
  console.log("id->", id);
  console.log("resData->", resData);
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
