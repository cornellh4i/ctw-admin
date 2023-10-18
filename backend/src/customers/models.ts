import { getModelForClass, prop } from "@typegoose/typegoose";

class Model {
  constructor(name: string, cost: number) {
    this.name = name;
    this.cost = cost;
  }

  @prop()
  public name!: string;
  
  @prop()
  public cost!: number;
}

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
  constructor(clusterID: string, model: Model) {
    this.clusterID = clusterID;
    this.model = model;
  }

  @prop()
  public clusterID!: string;

  @prop()
  public model!: Model;
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
const ModelModel = getModelForClass(Model);

export { Cluster, ClusterModel, Net, NetModel, Data, DataModel, Model, ModelModel };
