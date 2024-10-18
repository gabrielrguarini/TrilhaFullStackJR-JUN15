import { Request, Response } from "express";
import { singUpSchema } from "../schemas/singUpSchema";
import { createUser, findUserByEmail } from "../services/user";
import { hash } from "bcrypt-ts";
import { prisma } from "../utils/prisma";
import jwt from "jsonwebtoken";

export const singUp = async (req: Request, res: Response) => {
  const body = req.body;

  try {
    const safeData = singUpSchema.safeParse(body);

    if (!safeData.success) {
      res.status(400).json({ error: safeData.error.flatten().fieldErrors });
      return;
    }

    const hasUser = await findUserByEmail(safeData.data.email);
    if (hasUser) {
      res.json({ error: "Usuário já cadastrado" });
      return;
    }

    const passwordHash = await hash(safeData.data.password, 10);

    const newUser = await createUser(safeData.data.email, passwordHash);
    const token = jwt.sign({ email: newUser.email }, process.env.JWT_SECRET!);
    res.json({
      token,
    });
  } catch (error) {
    res.json({ error });
  }
};
