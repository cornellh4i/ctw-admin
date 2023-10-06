import { getModelForClass, prop } from "@typegoose/typegoose";

class Job {
  constructor(title: string, company: string) {
    this.title = title;
    this.company = company;
  }

  @prop()
  public title!: string;

  @prop()
  public company!: string;
}

class Customer {
  constructor(name: string, age: number, title: string, company: string) {
    this.name = name;
    this.age = age;
    this.job = new Job(title, company);
  }

  @prop()
  public name!: string;

  @prop()
  public age!: number;

  // nesting a sub-document
  @prop()
  public job!: Job;
}

class Member {
  constructor(name: string, netid: string, age: number) {
    this.name = name;
    this.netid = netid;
    this.age = age;
  }

  @prop()
  public name!: string;

  @prop()
  public netid!: string;

  @prop()
  public age!: number;
}
// const CustomerModel = getModelForClass(Customer);
const MemberModel = getModelForClass(Member);

export { Member, MemberModel };