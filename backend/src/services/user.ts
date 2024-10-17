import { prisma } from "../utils/prisma";

export const findUserByEmail = async (email: string) => {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  return user;
};
