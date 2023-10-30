import firebase from "firebase/auth";
import { ListUsersResult, UserRecord } from "firebase-admin/auth";
var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const listAllUsers = (nextPageToken?: string) => {
  let allUsers: any[] = [];
  // List batch of users, 1000 at a time.
  admin
    .auth()
    .listUsers(1000, nextPageToken)
    .then((listUsersResult: ListUsersResult) => {
      allUsers.push(...listUsersResult.users);
      // listUsersResult.users.forEach((userRecord: UserRecord) => {
      //   // allUsers.push(...userRecord.toJSON());
      //   console.log("allusers 1 ", allUsers);
      //   console.log("user", userRecord.toJSON());
      // });
      if (listUsersResult.pageToken) {
        // List next batch of users.
        listAllUsers(listUsersResult.pageToken);
      }
    })
    .catch((error: any) => {
      console.log("Error listing users:", error);
    });
  console.log("allusers", allUsers);
  return allUsers;
};
