import { getModelForClass, prop } from "@typegoose/typegoose";
class Data {
  constructor(
    net_id: string,
    date: Date,
    created_at: Date,
    water_collected: number
  ) {
    this.net_id = net_id;
    this.date = date;
    this.created_at = created_at;
    this.water_collected = water_collected;
  }

  @prop()
  public net_id!: string;

  @prop()
  public date!: Date;

  @prop()
  public created_at!: Date;

  @prop()
  public water_collected!: number;
}

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

class Net {
  constructor(cluster_id: string, model: Model) {
    this.cluster_id = cluster_id;
    this.model = model;
  }

  @prop()
  public cluster_id!: string;

  @prop()
  public model!: Model;
}

class Cluster {
  constructor(
    location: [number],
    nets_in_cluster: number,
    community: string,
    population: number
  ) {
    this.location = location;
    this.nets_in_cluster = nets_in_cluster;
    this.community = community;
    this.population - population;
  }

  @prop()
  public location!: [number];

  @prop()
  public nets_in_cluster!: number;

  @prop()
  public community!: string;

  @prop()
  public population!: number;
}

const ClusterModel = getModelForClass(Cluster);
const NetModel = getModelForClass(Net);
const DataModel = getModelForClass(Data);
const ModelModel = getModelForClass(Model);

export {
  Cluster,
  ClusterModel,
  Net,
  NetModel,
  Data,
  DataModel,
  Model,
  ModelModel,
};
