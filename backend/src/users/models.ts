// Models here, mirroring those from ../customers/models.ts
import { getModelForClass, prop } from "@typegoose/typegoose";

class User {
  constructor(firstName: string, lastName: string, email: string, age: number) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.age = age;
  }

  @prop()
  public firstName!: string;

  @prop()
  public lastName!: string;

  @prop()
  public email!: string;

  @prop()
  public age!: number;
}

const UserModel = getModelForClass(User);
export { User, UserModel };
