// use Controllers here, just as we did in ../users/controllers.ts

import { Router } from "express";
import { listAllUsers } from "./firebase-functions";

const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.send("Hello from a subrouter");
});

userRouter.post("/", (req, res) => {
  res.send(req.body);
});

userRouter.get("/listAllUsers", (req, res) => {
  res.status(200).send(listAllUsers());
});

export default userRouter;
