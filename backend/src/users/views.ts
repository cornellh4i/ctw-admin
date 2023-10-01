// use Controllers here, just as we did in ../users/controllers.ts

import { Router } from "express";
import { successJson } from "../utils/jsonResponses";
import UserController from "./controllers";

const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.send("Hello from a subrouter");
});

userRouter.post("/", (req, res) => {
  res.send(req.body);
});

/** POST request for inserting a user into DB */
userRouter.post("/create", async (req, res) => {
  const { firstName, lastName, netID, className, credits } = req.body;
  res
    .status(201)
    .send(
      successJson(
        await UserController.insertUser(firstName, lastName, netID, className, credits)
      )
    )
});

export default userRouter;
