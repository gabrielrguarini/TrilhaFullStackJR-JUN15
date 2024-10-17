import { Request, Response } from "express";

export const ping = (req: Request, res: Response) => {
  res.json({ ping: true });
};

export const pingAuth = (req: Request, res: Response) => {
  res.json({ pingAuth: "true" });
};
