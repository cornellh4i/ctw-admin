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

/** Modify an existing user's claims to be new_claim */
userRouter.post("/modify/", (req, res) => {
  const { uid, new_claim } = req.body;
  res
    .status(200)
    .send(
      successJson(
        UserController.changeClaim(uid, new_claim)
    )
  );
});

export default userRouter;
