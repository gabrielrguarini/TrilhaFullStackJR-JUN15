import { Request, Response } from "express";
import { findUserByEmail } from "../services/user";
import { createProject, findProjectsByUser } from "../services/project";
import { postSchema } from "../schemas/postSchema";

export const getProjects = async (req: Request, res: Response) => {
  const { email } = req.token;
  const user = await findUserByEmail(email);
  if (!user) {
    res.status(400).json({ error: "Usuário não encontrado" });
    return;
  }
  const posts = await findProjectsByUser(user.id);
  res.json(posts);
};

export const addProject = async (req: Request, res: Response) => {
  const { email } = req.token;
  const body = req.body;
  const safeData = postSchema.safeParse(body);
  if (!safeData.success) {
    res.status(400).json({ error: safeData.error.flatten().fieldErrors });
    return;
  }
  const user = await findUserByEmail(email);
  if (!user) {
    res.status(400).json({ error: "Erro ao criar projeto para o usuário" });
    return;
  }
  const project = await createProject(
    safeData.data.title,
    safeData.data.body,
    user.id
  );
  res.json({ project });
};

export const editPost = async (req: Request, res: Response) => {};
