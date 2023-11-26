import mongoose from "mongoose";
import {
  Cluster,
  ClusterModel,
  Net,
  NetModel,
  Data,
  DataModel,
  Model,
  ModelModel,
} from "./models";
import { type } from "os";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

/** NOTE: THESE FUNCTIONS ARE TEMPORARY AND FOR TESTING PURPOSES ONLY */
/**
 * Finds all cluster docs in DB
 * @returns promise with all cluster docs or error
 */
const getClusters = async () => ClusterModel.find({});

/**
 * Inserts new cluster into DB
 * @param location list of locations
 * @returns promise with new cluster doc or error
 */
const insertCluster = async (
  location: [number],
  nets_in_cluster: number,
  community: string,
  population: number
) =>
  ClusterModel.create(
    new Cluster(location, nets_in_cluster, community, population)
  );

/**
 * Finds all net docs in DB
 * @returns promise with all net docs or error
 */
const getNets = async () => NetModel.find({});

/**
 * Finds all net docs by cluster id
 * @param id cluster id
 * @returns promise with net docs or error
 */
const getNetByClusterId = async (id: string) =>
  NetModel.find({ clusterID: id });

/**
 * Inserts new net into DB
 * @param clusterID cluster id
 * @param model model of fog net
 * @returns promise with new net doc or error
 */
const insertNet = async (clusterID: string, model: Model) =>
  NetModel.create(new Net(clusterID, model));

/**
 * Finds all data docs in DB
 * @returns promise with all data docs or error
 */
const getData = async () => DataModel.find({});

/**
 * Finds all data docs by net id
 * @param id net id
 * @returns promise with data doc or error
 */
const getDataByNetId = async (id: string) => DataModel.find({ netID: id });

/**
 * Inserts new data into DB
 * @param netID net id
 * @param date date of data collected
 * @param water_collected amount of water collected
 * @returns promise with new data doc or error
 */
const insertData = async (
  netID: string,
  date: Date,
  created_at: Date,
  water_collected: number
) => DataModel.create(new Data(netID, date, created_at, water_collected));

/**
 * Removes data by id from DB
 * @param id data id
 * @returns doc containg bool acknowledged and number deletedCount
 */
const deleteData = async (id: string) => {
  const deleteDataResult = await DataModel.deleteOne({
    _id: new mongoose.Types.ObjectId(id),
  });
  return { deleteDataResult };
};

/**
 * Removes net by id from DB
 * @param id net id
 * @returns doc containg bool acknowledged and number deletedCount
 */
const deleteNet = async (id: string) => {
  const deleteNetResult = await NetModel.deleteOne({
    _id: new mongoose.Types.ObjectId(id),
  });
  const deleteDataResult = await DataModel.deleteMany({ netID: id });
  return { deleteNetResult, deleteDataResult };
};

/**
 * Removes cluster by id from DB
 * @param id cluster id
 * @returns doc containg bool acknowledged and number deletedCount
 */
const deleteCluster = async (id: string) => {
  const nets = await NetModel.find({ clusterID: id });
  let netClusterIDs: mongoose.Types.ObjectId[] = [];
  nets.forEach((net) => {
    netClusterIDs.push(net["_id"]);
  });
  console.log(netClusterIDs);
  const deleteClusterResult = await ClusterModel.deleteOne({
    _id: new mongoose.Types.ObjectId(id),
  });
  netClusterIDs.forEach(async (n) => await deleteNet(n.toString()));
  return {
    deleteClusterResult,
  };
};

/** NOTE: END OF TEMPORARY FUNCTIONS */

/**
 * Helper function finds all data docs from list of netIDs
 * @param netIds list of netIDs
 * @param minDate earliest date to query data
 * @param minDate latest date to query data
 * @returns data docs or error
 */
const getAllDocsByNetIDs = async (
  netIds: string[],
  minDate: Date,
  maxDate: Date
) => {
  const cursor = DataModel.find({
    netID: { $in: netIds },
    date: { $gte: minDate, $lte: maxDate },
  });
  const datas = [];
  for await (const doc of cursor) {
    datas.push(doc);
  }

  return datas;
};

/**
 * Finds all data docs from clusters in list clusterIds
 * @param clusterIds list of clusterIDs
 * @param minDate earliest date to query data
 * @param minDate latest date to query data
 * @returns data docs or error
 */
const getAllDocsByClusterIDs = async (
  clusterIds: string[],
  minDate: Date,
  maxDate: Date
) => {
  const cursor = NetModel.find({ clusterID: { $in: clusterIds } });
  const netIds = [];
  for await (const doc of cursor) {
    netIds.push(doc.id);
  }

  return getAllDocsByNetIDs(netIds, minDate, maxDate);
};

/**
 * Finds all data docs from clusters in list clusterIds that have same model type
 * @param clusterIds list of clusterIDs
 * @param minDate earliest date to query data
 * @param minDate latest date to query data
 * @param model model of fog net
 * @returns data docs or error
 */
const getAllDocsByModelAndClusterIDs = async (
  clusterIds: string[],
  minDate: Date,
  maxDate: Date,
  netModel: Model
) => {
  const cursor = NetModel.find({
    clusterID: { $in: clusterIds },
    "model.name": netModel.name,
    "model.cost": netModel.cost,
  });
  const netIds = [];
  for await (const doc of cursor) {
    netIds.push(doc.id);
  }

  return getAllDocsByNetIDs(netIds, minDate, maxDate);
};

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
      { "location.1": { $lte: upper_right[1] } },
    ],
  });

export default {
  getClusters,
  insertCluster,
  deleteCluster,
  getNets,
  getNetByClusterId,
  insertNet,
  deleteNet,
  getData,
  getDataByNetId,
  insertData,
  deleteData,
  getClustersByLocation,
  getAllDocsByClusterIDs,
  getAllDocsByModelAndClusterIDs,
};
