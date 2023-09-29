// Controllers here, following the pattern in ../customers/controllers.ts
import mongoose from "mongoose";

import { User, UserModel } from "./models";

/**
 * Inserts new customer into DB
 * @param fistName customer first name
 * @param lastName customer last name
 * @param email customer email
 * @param age customer age
 *
 * @returns promise with new user doc or error
 */
const insertUser = async (
  firstName: string,
  lastName: string,
  email: string,
  age: number
) => UserModel.create(new User(firstName, lastName, email, age));

export default {
  insertUser,
};
