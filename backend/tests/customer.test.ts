import { dbConnect, dbDisconnect } from "../src/database";
import ClusterController from "../src/customers/controllers";
import { Cluster, ClusterModel, Net, NetModel, Data, DataModel } from "../src/customers/models";

beforeAll(async () => {
  await dbConnect();
});

afterAll(async () => {
  await dbDisconnect();
});

describe("Cluster Retreival Tests", () => {
  test("Get all clusters", async () => {
    const allClusters = await ClusterController.getClusters();
    for (let cluster of allClusters) {
      expect(cluster.location).toBeDefined();
    }
  });
});
