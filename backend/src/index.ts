import express from "express";
import bodyParser from "body-parser";
import DocRouter from "./customers/views";
import userRouter from "./users/views";
import swaggerUI from "swagger-ui-express";
import spec from "../api-spec.json";
import { dbConnect } from "./database";

import cors from "cors";


const app = express();
const cors = require("cors");
app.use(cors());

app.use(cors());

// Middleware to parse json request bodies
app.use(bodyParser.json());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(spec));

/**
 * Sub-routers for our main router, we should have one sub-router per "entity" in the application
 */
app.use("/clusters", DocRouter);
app.use("/users", userRouter);

/**
 * Some dummy routes to illustrate express syntax
 */
app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.post("/", (req, res) => {
  res.send(req.body);
});

app.listen(process.env.PORT || 8000, async () => {
  console.log("✅ Server is up and running");
  await dbConnect();
});
