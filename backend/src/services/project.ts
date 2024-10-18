import { prisma } from "../utils/prisma";

export const findProjectsByUser = async (id: number) => {
  const posts = await prisma.project.findMany({
    where: {
      userId: id,
    },
  });
  return posts;
};

export const createProject = async (
  title: string,
  body: string,
  userId: number
) => {
  const post = await prisma.project.create({
    data: {
      title,
      body,
      userId,
    },
  });
  return post;
};
