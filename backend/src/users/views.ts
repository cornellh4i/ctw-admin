// use Controllers here, just as we did in ../users/controllers.ts

import { Router } from "express";
import { createUser, deleteUser } from "./firebase-functions";

const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.send("Hello from a subrouter");
});

userRouter.post("/add/:number/:claim", (req, res) => {
  createUser(req.params.number, +req.params.claim);
  res.send(req.body);
});

userRouter.delete("/delete/:number", (req, res) => {
  deleteUser(req.params.number);
  res.send(req.body);
});

export default userRouter;
