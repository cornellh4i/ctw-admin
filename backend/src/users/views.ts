// use Controllers here, just as we did in ../users/controllers.ts

import { Router } from "express";
import { createUser } from "./firebase-functions";

const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.send("Hello from a subrouter");
});

userRouter.post("/add/:number", (req, res) => {
  createUser(req.params.number, 3);
  res.send(req.body);
});

export default userRouter;
