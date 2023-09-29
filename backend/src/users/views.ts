// use Controllers here, just as we did in ../users/controllers.ts

import { Router } from "express";
import UserController from "./controllers";

import { successJson, errorJson } from "../utils/jsonResponses";

const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.send("Hello from a subrouter");
});

userRouter.post("/", (req, res) => {
  res.send(req.body);
});

userRouter.post("/", async (req, res) => {
  const { firstName, lastName, email, age } = req.body;
  res
    .status(201)
    .send(
      successJson(
        await UserController.insertUser(firstName, lastName, email, age)
      )
    );
});

export default userRouter;
