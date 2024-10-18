import { prisma } from "../utils/prisma";

export const findUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
};

export const updateUser = async (email: string, password: string) => {
  const user = await prisma.user.update({
    where: {
      email,
    },
    data: {
      password,
    },
  });
  return { id: user?.id, email: user?.email };
};

export const createUser = async (email: string, password: string) => {
  const user = await prisma.user.create({
    data: {
      email,
      password,
    },
  });
  return { id: user?.id, email: user?.email };
};
