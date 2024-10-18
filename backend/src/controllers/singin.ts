import { Request, Response } from "express";
import { singUpSchema } from "../schemas/singUpSchema";
import { findUserByEmail } from "../services/user";
import { compare } from "bcrypt-ts";
import jwt from "jsonwebtoken";

export const singIn = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const safeData = singUpSchema.safeParse(body);
    if (!safeData.success) {
      res.status(401).json({ error: safeData.error.flatten().fieldErrors });
      return;
    }

    const user = await findUserByEmail(safeData.data?.email);
    if (!user) {
      res.status(401).json({ error: "Usuário ou senha incorretos" });
      return;
    }

    console.log("Antes do compare");
    console.log("Senha fornecida:", safeData.data.password);
    console.log("Senha armazenada:", user.password);
    const passwordMatch = await compare(safeData.data.password, user.password);
    console.log("Depois do compare");
    if (!passwordMatch) {
      res.status(401).json({ error: "Usuário ou senha incorretos" });
      return;
    }
    const token = jwt.sign(
      { email: safeData.data.email },
      process.env.JWT_SECRET!
    );
    res.json({ token, email: safeData.data.email });
    return;
  } catch (error) {
    console.log(error);
    res.json({ error });
    return;
  }
};
