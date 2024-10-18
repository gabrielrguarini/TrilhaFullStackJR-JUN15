import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ error: "Acesso negado" });
    return;
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    res.status(401).json({ error: "Acesso negado" });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
  req.token = decoded;
  next();
};

export const singJWT = (email: string) => {
  jwt.sign({ email }, process.env.JWT_SECRET!);
};
