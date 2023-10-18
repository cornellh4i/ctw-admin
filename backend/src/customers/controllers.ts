import mongoose from "mongoose";
import { Cluster, ClusterModel, Net, NetModel, Data, DataModel, Model, ModelModel } from "./models";
import { type } from "os";

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
const insertCluster = async (location: [number]) =>
  ClusterModel.create(new Cluster(location));

/**
 * Removes cluster by id from DB
 * @param id cluster id
 * @returns doc containg bool acknowledged and number deletedCount
 */
const deleteCluster = async (id: string) => {
  ClusterModel.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
  NetModel.deleteMany({ clusterID: id }); // FIX: does not delete associated net docs
  // TODO: delete associated data docs
};

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
 * Removes net by id from DB
 * @param id net id
 * @returns doc containg bool acknowledged and number deletedCount
 */
const deleteNet = async (id: string) => {
  console.log(id);
  NetModel.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
  DataModel.deleteMany({ netID: id }); // FIX: does not delete associated data docs
};

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
const insertData = async (netID: string, date: Date, water_collected: number) =>
  DataModel.create(new Data(netID, date, water_collected));

/**
 * Removes data by id from DB
 * @param id data id
 * @returns doc containg bool acknowledged and number deletedCount
 */
const deleteData = async (id: string) =>
  DataModel.deleteOne({ _id: new mongoose.Types.ObjectId(id) });

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
    date: { $gte: minDate, $lte: maxDate }
  });
  const datas = [];
  for await (const doc of cursor) {
    datas.push(doc);
  }

  return datas
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

  return getAllDocsByNetIDs(netIds, minDate, maxDate)
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
    "model.cost": netModel.cost
  });
  const netIds = [];
  for await (const doc of cursor) {
    netIds.push(doc.id);
  }

  return getAllDocsByNetIDs(netIds, minDate, maxDate)
};

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
  getAllDocsByClusterIDs,
  getAllDocsByModelAndClusterIDs
};
