import { Request, Response } from "express";
import { findUserByEmail } from "../services/user";
import {
  createProject,
  findProjectById,
  findProjectsByUser,
  removeProject,
  updateProject,
} from "../services/project";
import { projectSchema } from "../schemas/projectSchema";

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
export const getProjectById = async (req: Request, res: Response) => {
  const { email } = req.token;
  const { id } = req.params;
  const idNumber = parseInt(id, 10);
  if (!idNumber) {
    res.status(400).json({ error: "Erro ao buscar projeto" });
  }
  const user = await findUserByEmail(email);
  if (!user) {
    res.status(400).json({ error: "Usuário não encontrado" });
    return;
  }
  const post = await findProjectById(idNumber);
  res.json(post);
};

export const addProject = async (req: Request, res: Response) => {
  const { email } = req.token;
  const body = req.body;
  const safeData = projectSchema.safeParse(body);
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

export const editProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  const body = req.body;
  const safeData = projectSchema.safeParse(body);
  if (!safeData.success) {
    res.status(401).json({ error: safeData.error.flatten().fieldErrors });
    return;
  }

  const project = await updateProject(
    Number(id),
    safeData.data.title,
    safeData.data.body
  );
  res.json({ ...project });
  return;
};

export const deleteProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  const numberId = parseInt(id);
  if (!numberId) {
    res.json({ error: "Id incorreto" });
    return;
  }

  const project = await findProjectById(Number(id));
  if (!project) {
    res.json({ error: "Projeto não existe" });
    return;
  }
  const oldProject = await removeProject(Number(id));
  res.json({ ...oldProject });
  return;
};
