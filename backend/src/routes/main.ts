import { Router } from "express";
import { ping, pingAuth } from "../controllers/ping";
import { singUp } from "../controllers/singup";
import { singIn } from "../controllers/singin";
import { verifyJWT } from "../utils/jwt";
import { editUser } from "../controllers/user";

export const mainRouter = Router();

mainRouter.get("/ping", ping);
mainRouter.get("/auth/ping", verifyJWT, pingAuth);

mainRouter.post("/auth/singup", singUp);
mainRouter.get("/auth/singin", singIn);
mainRouter.put("/edit/user", verifyJWT, editUser);

// mainRouter.get("/posts", getPost);
// mainRouter.get("/create", addPost);
// mainRouter.get("/edit/post", editPost);
// mainRouter.get("/delete/post", deletePost);
