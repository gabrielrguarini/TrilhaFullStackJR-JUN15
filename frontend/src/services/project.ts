import { ProjectSchema } from "@/schemas/projectSchema";

export const deleteProjectById = async (id: number, token: string) => {
  const response = await fetch(`http://localhost:3333/project/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const resData = await response.json();
  console.log(resData);
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
  return await response.json();
};
