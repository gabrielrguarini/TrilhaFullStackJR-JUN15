import { prisma } from "../utils/prisma";

export const findProjectsByUser = async (userId: number) => {
  const projects = await prisma.project.findMany({
    where: {
      userId,
    },
  });
  return projects;
};
export const findProjectsById = async (id: number) => {
  const project = await prisma.project.findUnique({
    where: {
      id,
    },
  });
  return project;
};

export const createProject = async (
  title: string,
  body: string,
  userId: number
) => {
  const project = await prisma.project.create({
    data: {
      title,
      body,
      userId,
    },
  });
  return project;
};
export const updateProject = async (
  id: number,
  title: string,
  body: string
) => {
  const project = await prisma.project.update({
    where: {
      id,
    },
    data: {
      title,
      body,
    },
  });
  return project;
};

export const removeProject = async (id: number) => {
  const project = await prisma.project.delete({
    where: {
      id,
    },
  });
  return project;
};
