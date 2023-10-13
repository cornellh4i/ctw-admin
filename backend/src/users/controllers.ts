// Controllers here, following the pattern in ../customers/controllers.ts
import mongoose from "mongoose";
import { UserModel, User } from "./models";

/**
 * Finds all user docs in DB
 * @returns promise with all user docs or error
 */
const getUsers = async () => UserModel.find({});


/** Inserts new user into DB 
 * @param firstName is athlete first name
 * @param lastName is athlete last name
 * @param school is athlete school name
 * @param rank is athlete rank
 * @param sport is athlete sport
 * @param jerseyNumber is athlete jersey number 
 * @returns promise with new user doc or error
*/
const insertUser = async (
  firstName : string,
  lastName : string,
  school : string,
  rank : number,
  sport : string, 
  jerseyNumber : number
) => UserModel.create(new User(firstName, lastName, school, rank, sport, jerseyNumber));

export default { getUsers, insertUser };