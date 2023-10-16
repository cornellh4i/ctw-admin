import mongoose from "mongoose";
import { Cluster, ClusterModel } from "./models";
import cluster from "cluster";

/**
 * Finds all clusters within specified coordinates
 * @param lower_left coordinates of lower left binding of location range
 * @param upper_right coordinates of upper right binding of location range
 * @returns list of cluster IDs that fall within location range
 */
const getClustersByLocation = async (
  lower_left: number[],
  upper_right: number[]
) =>
  ClusterModel.find({
    $and: [
      { "location.0": { $gte: lower_left[0] } },
      { "location.0": { $lte: upper_right[0] } },
      { "location.1": { $gte: lower_left[1] } },
      { "location.1": { $lte: upper_right[1] } }
    ]
  })

export default {
  getClustersByLocation,
};
