import { Router } from "express";
import mongoose from "mongoose";
import DocController from "./controllers";

// Note: we should use a try/catch to choose successJson or errorJson for responses
// this has been left out of this snippet for brevity
import { successJson, errorJson } from "../utils/jsonResponses";

const docRouter = Router();

/**
 * Gets all cluster IDs in location range [lower_left, upper_right]
 */
docRouter.post("/get-clusters-in-range/", async (req, res) => {
  const { lower_left, upper_right } = req.body;
  res
    .status(200)
    .send(
      successJson(
        await DocController.getClustersByLocation(lower_left, upper_right)
      )
    );
});

export default docRouter;
