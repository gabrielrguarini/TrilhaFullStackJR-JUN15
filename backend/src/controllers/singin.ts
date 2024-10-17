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
      res.status(401).json({ error: "Não autorizado" });
      return;
    }

    const user = await findUserByEmail(safeData.data?.email);
    if (!user) {
      res.status(401).json({ error: "Não autorizado" });
      return;
    }

    const passwordMatch = compare(safeData.data.password, user.password);
    if (!passwordMatch) {
      res.status(401).json({ error: "Não autorizado" });
      return;
    }
    const token = jwt.sign(
      { email: safeData.data.email },
      process.env.JWT_SECRET!
    );
    res.json({ token, email: safeData.data.email });
  } catch (error) {
    res.json({ error });
  }
};
