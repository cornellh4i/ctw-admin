import { getModelForClass, prop } from "@typegoose/typegoose";

// Models here, mirroring those from ../customers/models.ts

/** Class represents a Cornell class with a class name and number of credits. */
class Class {
  constructor(className: string, credits: number) {
    this.className = className;
    this.credits = credits;
  }

  @prop()
  public className: string;

  @prop()
  public credits: number;
}

/** User represents a Cornell student with a name, netID, and one class. */
class User {
  constructor(firstName: string, lastName: string, netID: string, className: string, credits: number) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.netID = netID;
    this.class = new Class(className, credits);
  }

  @prop()
  public firstName: string;

  @prop()
  public lastName: string;

  @prop()
  public netID: string

  @prop()
  public class!: Class
}

const UserModel = getModelForClass(User);
export { User, UserModel };