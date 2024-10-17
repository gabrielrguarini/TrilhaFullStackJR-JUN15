import { Request, Response } from "express";
import { singUpSchema } from "../schemas/singUpSchema";

export const singUp = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const safeData = singUpSchema.safeParse(body);
  } catch (error) {
    res.json({ error });
  }
};
