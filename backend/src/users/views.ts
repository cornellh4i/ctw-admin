// use Controllers here, just as we did in ../users/controllers.ts

import { Router } from "express";
import AthletesController from "./controllers";
import { successJson } from "../utils/jsonResponses";

const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.send("Hello from a subrouter");
});

userRouter.post("/", (req, res) => {
  res.send(req.body);
});

userRouter.get("/all", async (req, res) => {
  // #swagger.tags = ['Users']
  res.status(200).send(await AthletesController.getUsers());
});

/** POST route to insert a new user into the DB */
userRouter.post("/insert", async(req, res) => {
  const { firstName, lastName, school, rank, sport, jerseyNumber } = req.body;
  res
    .status(201)
    .send(
      successJson(
        await AthletesController.insertUser(firstName, lastName, school, rank, sport, jerseyNumber)
      )
    )
});

export default userRouter;
