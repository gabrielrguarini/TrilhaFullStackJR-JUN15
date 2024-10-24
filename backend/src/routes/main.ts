import { Router } from "express";
import { ping, pingAuth } from "../controllers/ping";
import { singUp } from "../controllers/singup";
import { singIn } from "../controllers/singin";
import { verifyJWT } from "../utils/jwt";
import { editUser } from "../controllers/user";
import {
  deleteProject,
  editProject,
  getProjects,
} from "../controllers/project";
import { addProject } from "../controllers/project";

export const mainRouter = Router();

mainRouter.get("/ping", ping);
mainRouter.get("/auth/ping", verifyJWT, pingAuth);

mainRouter.post("/auth/singup", singUp);
mainRouter.post("/auth/singin", singIn);
mainRouter.put("/user", verifyJWT, editUser);

mainRouter.get("/projects", verifyJWT, getProjects);
mainRouter.post("/project", verifyJWT, addProject);
mainRouter.put("/project/:id", verifyJWT, editProject);
mainRouter.delete("/project/:id", verifyJWT, deleteProject);
