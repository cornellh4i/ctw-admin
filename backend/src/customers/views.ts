import { Router } from "express";
import mongoose from "mongoose";
import DocController from "./controllers";
import { Model } from "./models";

// Note: we should use a try/catch to choose successJson or errorJson for responses
// this has been left out of this snippet for brevity
import { successJson, errorJson } from "../utils/jsonResponses";

const docRouter = Router();

// NOTE: THESE ROUTES ARE TEMPORARY AND FOR TESTING PURPOSES ONLY
docRouter.get("/", async (req, res) => {
  res.status(200).send(await DocController.getClusters());
});

docRouter.post("/", async (req, res) => {
  const { location } = req.body;
  res.status(201).send(successJson(await DocController.insertCluster(location)));
});

docRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  res.status(201).send(successJson( await DocController.deleteCluster(id)));
});

docRouter.get("/nets/", async (req, res) => {
  res.status(200).send(await DocController.getNets());
});

docRouter.get("/nets/:id", async (req, res) => {
  const id = req.params.id;
  res.status(200).send(successJson(await DocController.getNetByClusterId(id)));
});

docRouter.post("/nets/", async (req, res) => {
  const { clusterID, model } = req.body;
  res.status(201).send( successJson(await DocController.insertNet(clusterID, model)));
});

docRouter.delete("/net/delete/:id", async (req, res) => {
  const id = req.params.id;
  res.status(201).send(successJson(await DocController.deleteNet(id)));
});

docRouter.get("/data/", async (req, res) => {
  res.status(200).send(await DocController.getData());
});

docRouter.get("/data/:id", async (req, res) => {
  const id = req.params.id;
  res.status(200).send(successJson(await DocController.getDataByNetId(id)));
});

docRouter.post("/data/", async (req, res) => {
  const { netID, date, water_collected } = req.body;
  res.status(201).send(successJson(await DocController.insertData(netID, date, water_collected)));
});

docRouter.delete("/data/delete/:id", async (req, res) => {
  const id = req.params.id;
  res.status(201).send(successJson(await DocController.deleteData(id)));
});
// NOTE: END OF TEMPORARY ROUTES

const clusterIds = ["65258f01ba4c14948edd4526", "6528685b77174a7928f4ef6d"] // NOTE: temp hardcoded list of clusterIDs for testing
docRouter.get("/clusterData/dates/:minDate/:maxDate/", async (req, res) => {
  let minDate = new Date(req.params.minDate);
  let maxDate = new Date(req.params.maxDate);
  res
    .status(200)
    .send(successJson(await DocController.getAllDocsByClusterIDs(clusterIds, minDate, maxDate)));
});

docRouter.get("/clusterData/min/:minDate", async (req, res) => {
  let minDate = new Date(req.params.minDate);
  let maxDate = new Date(new Date().toJSON().slice(0, 10));
  res
    .status(200)
    .send(successJson(await DocController.getAllDocsByClusterIDs(clusterIds, minDate, maxDate)));
});

docRouter.get("/clusterData/max/:maxDate", async (req, res) => {
  let minDate = new Date("2023-01-01");
  let maxDate = new Date(req.params.maxDate);
  res
    .status(200)
    .send(successJson(await DocController.getAllDocsByClusterIDs(clusterIds, minDate, maxDate)));
});

docRouter.get("/clusterData/", async (req, res) => {
  let minDate = new Date("2023-01-01");
  let maxDate = new Date(new Date().toJSON().slice(0, 10));
  res
    .status(200)
    .send(successJson(await DocController.getAllDocsByClusterIDs(clusterIds, minDate, maxDate)));
});

docRouter.get("/netModelData/:modelName/:modelCost/dates/:minDate/:maxDate/", async (req, res) => {
  let minDate = new Date(req.params.minDate);
  let maxDate = new Date(req.params.maxDate);
  let name = req.params.modelName;
  let cost = Number(req.params.modelCost);
  let model = new Model(name, cost);
  res
    .status(200)
    .send(successJson(await DocController.getAllDocsByModelAndClusterIDs(clusterIds, minDate, maxDate, model)));
});

docRouter.get("/netModelData/:modelName/:modelCost/min/:minDate", async (req, res) => {
  let minDate = new Date(req.params.minDate);
  let maxDate = new Date(new Date().toJSON().slice(0, 10));
  let name = req.params.modelName;
  let cost = Number(req.params.modelCost);
  let model = new Model(name, cost);
  res
    .status(200)
    .send(successJson(await DocController.getAllDocsByModelAndClusterIDs(clusterIds, minDate, maxDate, model)));
});

docRouter.get("/netModelData/:modelName/:modelCost/max/:maxDate", async (req, res) => {
  let minDate = new Date("2023-01-01");
  let maxDate = new Date(req.params.maxDate);
  let name = req.params.modelName;
  let cost = Number(req.params.modelCost);
  let model = new Model(name, cost);
  res
    .status(200)
    .send(successJson(await DocController.getAllDocsByModelAndClusterIDs(clusterIds, minDate, maxDate, model)));
});

docRouter.get("/netModelData/:modelName/:modelCost", async (req, res) => {
  let minDate = new Date("2023-01-01");
  let maxDate = new Date(new Date().toJSON().slice(0, 10));
  let name = req.params.modelName;
  let cost = Number(req.params.modelCost);
  let model = new Model(name, cost);
  res
    .status(200)
    .send(successJson(await DocController.getAllDocsByModelAndClusterIDs(clusterIds, minDate, maxDate, model)));
});

export default docRouter;