import mongoose from "mongoose";
import { UserModel, User } from "./models";
// Controllers here, following the pattern in ../customers/controllers.ts

/** Inserts new user into DB
 * @param firstName user first name
 * @param lastName user last name
 * @param netID user netID
 * @param className class name
 * @param credits class number of credits
 * @returns promise with new user doc or error
 */
const insertUser = async (
  firstName: string,
  lastName: string,
  netID: string,
  className: string,
  credits: number
) => UserModel.create(new User(firstName, lastName, netID, className, credits));

export default { insertUser };