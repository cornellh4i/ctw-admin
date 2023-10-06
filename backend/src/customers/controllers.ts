import mongoose from "mongoose";

import { Member, MemberModel } from "./models";

// /**
//  * Finds all customer docs in DB
//  * @returns promise with all customer docs or error
//  */
// const getCustomers = async () => CustomerModel.find({});

// /**
//  * Finds a customer doc by id
//  * @param id customer id
//  * @returns promise with customer doc or error
//  */
// const getCustomerById = async (id: mongoose.Types.ObjectId) =>
//   CustomerModel.find({ _id: id });

// /**
//  * Updates the name of a customer in DB
//  * @param id customer id
//  * @param name new name
//  * @returns promise with original customer doc or error
//  */
// const updateName = async (id: mongoose.Types.ObjectId, name: string) =>
//   CustomerModel.findOneAndUpdate({ _id: id }, { name: name });

// /**
//  * Inserts new customer into DB
//  * @param name customer name
//  * @param age customer age
//  * @param title customer job title
//  * @param company customer job company
//  * @returns promise with new customer doc or error
//  */
// const insertCustomer = async (
//   name: string,
//   age: number,
//   title: string,
//   company: string
// ) => CustomerModel.create(new Customer(name, age, title, company));

// /**
//  * Resets ages of all customers in DB to 0
//  * @returns number of customers whose age was reset
//  */
// const resetAges = async () => {
//   const customers = await getCustomers();
//   customers.forEach(async (customer) => {
//     customer.age = 0;
//     await customer.save();
//   });

//   return customers.length;
// };

/**
 * Finds all members docs in DB
 * @returns promise with all members docs or error
 */
const getMembers = async () => MemberModel.find({});

/**
 * Finds a member doc by id
 * @param id member id
 * @returns promise with member doc or error
 */
const getMemberById = async (id: mongoose.Types.ObjectId) =>
  MemberModel.find({ _id: id });

/**
 * Inserts new member into DB
 * @param name member name
* @param netid member netid
 * @param age member age
 * @returns promise with new member doc or error
 */
const insertMember = async (
  name: string,
  netid: string,
  age: number
) => MemberModel.create(new Member(name, netid, age));

export default {
  // getCustomers,
  // getCustomerById,
  // updateName,
  // insertCustomer,
  // resetAges,
  getMembers,
  insertMember
};
