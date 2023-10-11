import { Router } from "express";
import mongoose from "mongoose";
import DocController from "./controllers";

// Note: we should use a try/catch to choose successJson or errorJson for responses
// this has been left out of this snippet for brevity
import { successJson, errorJson } from "../utils/jsonResponses";

const docRouter = Router();

docRouter.get("/", async (req, res) => {
  res.status(200).send(await DocController.getClusters());
});

docRouter.post("/", async (req, res) => {
  const { location } = req.body;
  res
    .status(201)
    .send(
      successJson(
        await DocController.insertCluster(location)
      )
    );
});

docRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  res
    .status(201)
    .send(
      successJson(
        await DocController.deleteCluster(id)
      )
    );
});

docRouter.get("/nets/", async (req, res) => {
  res.status(200).send(await DocController.getNets());
});

docRouter.get("/nets/:id", async (req, res) => {
  const id = req.params.id;
  res
    .status(200)
    .send(successJson(await DocController.getNetByClusterId(id)));
});

docRouter.post("/nets/", async (req, res) => {
  const { clusterID, type } = req.body;
  res
    .status(201)
    .send(
      successJson(
        await DocController.insertNet(clusterID, type)
      )
    );
});

docRouter.delete("/net/delete/:id", async (req, res) => {
  const id = req.params.id;
  res
    .status(201)
    .send(
      successJson(
        await DocController.deleteNet(id)
      )
    );
});

docRouter.get("/data/", async (req, res) => {
  res.status(200).send(await DocController.getData());
});

docRouter.get("/data/:id", async (req, res) => {
  const id = req.params.id;
  res
    .status(200)
    .send(successJson(await DocController.getDataByNetId(id)));
});

docRouter.post("/data/", async (req, res) => {
  const { netID, date, water_collected } = req.body;
  res
    .status(201)
    .send(
      successJson(
        await DocController.insertData(netID, date, water_collected)
      )
    );
});

docRouter.delete("/data/delete/:id", async (req, res) => {
  const id = req.params.id;
  res
    .status(201)
    .send(
      successJson(
        await DocController.deleteData(id)
      )
    );
});

const clusterIds = ["65258f01ba4c14948edd4526", "65258d88899b7e221c1d33eb"] // NOTE: temp hardcoded list of clusterIDs for testing
docRouter.get("/:minDate/:maxDate/", async (req, res) => {
  let minDate = new Date(); // FIX: right now minDate and maxDate are required fields but they should be able to be left empty
  let maxDate = new Date();
  if (req.params.minDate) {minDate = new Date(req.params.minDate)}
  else {minDate = new Date("2023-01-01")};
  if (req.params.maxDate) {maxDate = new Date(req.params.maxDate)} // Assumes the date is valid with correct syntax
  else {maxDate = new Date(new Date().toJSON().slice(0, 10))};
  res
    .status(200)
    .send(successJson(await DocController.getAllDocsByClusterIDs(clusterIds, minDate, maxDate)));
});

export default docRouter;
