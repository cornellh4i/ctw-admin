// Models here, mirroring those from ../customers/models.ts
import { getModelForClass, prop } from "@typegoose/typegoose";

/** Sport represents a person's sport and their affiliated jersey number */
class Sport {
  constructor(sport : string, jerseyNumber : number) {
    this.sport = sport; 
    this.jerseyNumber = jerseyNumber;
  }

  @prop()
  public sport : string;

  @prop()
  public jerseyNumber : number;
}

/** User represents a student athlete with first name, last name, school, and 
 * sport */
class User {
  constructor(firstName : string, lastName : string, school : string, rank : number, sport : string, jerseyNumber : number) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.school = school; 
    this.rank = rank;
    this.sport = new Sport(sport, jerseyNumber);
  }

  @prop()
  public firstName : string; 

  @prop()
  public lastName : string; 

  @prop()
  public school : string;

  @prop() 
  public rank : number;

  @prop()
  public sport !: Sport;
}

const UserModel = getModelForClass(User);
export { User, UserModel };
