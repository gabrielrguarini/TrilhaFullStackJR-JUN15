import { Router } from "express";
import { ping } from "../controllers/ping";
import { singUp } from "../controllers/singup";

export const mainRouter = Router();

mainRouter.get("/ping", ping);

// mainRouter.post("/auth/singup", singUp);
// mainRouter.get("/auth/singin", singIn);
// mainRouter.put("/edit/user", editUser);

// mainRouter.get("/posts", getPost);
// mainRouter.get("/create", addPost);
// mainRouter.get("/edit/post", editPost);
// mainRouter.get("/delete/post", deletePost);
