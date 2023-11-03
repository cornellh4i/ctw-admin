// use Controllers here, just as we did in ../users/controllers.ts

import { Router } from "express";
import { createUser, deleteUser } from "./firebase-functions";
import { successJson } from "../utils/jsonResponses";
import UserController from "./controllers";
import { verifyToken } from "../utils/admin";

const userRouter = Router();

userRouter.use(verifyToken);

userRouter.get("/users", (req, res) => {
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
