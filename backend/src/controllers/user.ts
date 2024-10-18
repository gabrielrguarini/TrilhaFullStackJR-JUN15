import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import { editUserSchema } from "../schemas/editUserSchema";
import { findUserByEmail } from "../services/user";

export const editUser = async (req: Request, res: Response) => {
  const { email } = req.token;
  const body = req.body;
  const safeData = editUserSchema.safeParse(body);
  if (!safeData.success) {
    res.status(401).json({ error: "Erro nos dados enviados" });
    return;
  }
  if (email != safeData.data.email) {
    res.status(401).json({ error: "não autorizado" });
    return;
  }

  const user = await findUserByEmail(safeData.data.email);
  if (!user) {
    res.json({ error: "Usuário não encontrado" });
    return;
  }

  const newUser = await prisma.user.update({
    where: {
      email,
    },
    data: {
      email,
    },
  });
  res.json({ newUser });
};
