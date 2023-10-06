import { Router } from "express";
import mongoose from "mongoose";
// import CustomerController from "./controllers";
import MemberController from "./controllers";

// Note: we should use a try/catch to choose successJson or errorJson for responses
// this has been left out of this snippet for brevity
import { successJson, errorJson } from "../utils/jsonResponses";

// const customerRouter = Router();
const memberRouter = Router();

// customerRouter.get("/", async (req, res) => {
//   // #swagger.tags = ['Customers']
//   res.status(200).send(await CustomerController.getCustomers());
// });

// customerRouter.get("/:id", async (req, res) => {
//   // #swagger.tags = ['Customers']
//   const id = new mongoose.Types.ObjectId(req.params.id);
//   res
//     .status(200)
//     .send(successJson(await CustomerController.getCustomerById(id)));
// });

// customerRouter.post("/", async (req, res) => {
//   // #swagger.tags = ['Customers']
//   const { name, age, title, company } = req.body;
//   res
//     .status(201)
//     .send(
//       successJson(
//         await CustomerController.insertCustomer(name, age, title, company)
//       )
//     );
// });

// customerRouter.put("/updateName/:id", async (req, res) => {
//   // #swagger.tags = ['Customers']
//   const id = new mongoose.Types.ObjectId(req.params.id);
//   const name = req.body.name;
//   res
//     .status(200)
//     .send(successJson(await CustomerController.updateName(id, name)));
// });

// customerRouter.post("/resetAges", async (req, res) => {
//   // #swagger.tags = ['Customers']
//   const numResets = await CustomerController.resetAges();
//   res.status(200).send(successJson(numResets));
// });

memberRouter.get("/", async (req, res) => {
  // #swagger.tags = ['Customers']
  res.status(200).send(await MemberController.getMembers());
});

memberRouter.post("/", async (req, res) => {
  // #swagger.tags = ['Customers']
  const { name, netid, age} = req.body;
  res
    .status(201)
    .send(
      successJson(
        await MemberController.insertMember(name, netid, age)
      )
    );
});

export default memberRouter;
