import { getModelForClass, prop } from "@typegoose/typegoose";

class Data {
  constructor(netID: string, date: Date, water_collected: number) {
    this.netID = netID;
    this.date = date;
    this.water_collected = water_collected;
  }

  @prop()
  public netID!: string;

  @prop()
  public date!: Date;

  @prop()
  public water_collected!: number;
}

class Net {
  constructor(clusterID: string, type: string) {
    this.clusterID = clusterID;
    this.type = type;
  }

  @prop()
  public clusterID!: string;

  @prop()
  public type!: string;
}

class Cluster {
  constructor(location: [number]) {
    this.location = location;
  }

  @prop()
  public location!: [number];
}

const ClusterModel = getModelForClass(Cluster);
const NetModel = getModelForClass(Net);
const DataModel = getModelForClass(Data);

export { Cluster, ClusterModel, Net, NetModel, Data, DataModel };
