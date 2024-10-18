import { Request, Response } from "express";
import { editUserSchema } from "../schemas/editUserSchema";
import { findUserByEmail, updateUser } from "../services/user";
import { hash } from "bcrypt-ts";

export const editUser = async (req: Request, res: Response) => {
  const { email } = req.token;
  const body = req.body;
  const safeData = editUserSchema.safeParse(body);
  if (!safeData.success) {
    res.status(401).json({ error: "Erro nos dados enviados" });
    return;
  }

  const user = await findUserByEmail(email);
  if (!user) {
    res.json({ error: "Usuário não encontrado" });
    return;
  }

  const passwordHash = await hash(safeData.data.password, 10);
  const newUser = await updateUser(email, passwordHash);
  res.json({ email: newUser.email });
};
