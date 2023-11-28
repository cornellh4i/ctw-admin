var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

export const admin_app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

/**
 * Create a new user given their phone number; number should have +(country code) prepended, e.g. +16071234567
 */
export function createUser(number: string, claim: number) {
  let customClaims = {};
  switch (claim) {
    case 0: {
      customClaims = { "mobile-entry": true };
      break;
    }
    case 1: {
      customClaims = { "web-entry": true };
      break;
    }
    case 2: {
      customClaims = { evaluator: true };
      break;
    }
    case 3: {
      customClaims = { admin: true };
      break;
    }
  }
  admin_app
    .auth()
    .createUser({
      phoneNumber: number,
    })
    .then((userRecord: any) => {
      admin_app.auth().setCustomUserClaims(userRecord.uid, customClaims);
      console.log("Successfully created new user:", userRecord.uid);
    })
    .catch((error: any) => {
      console.log("Error creating new user: ", error);
    });
}

/**
 * Delete a user given their phone number; number should have +(country code) prepended, e.g. +16071234567
 */
export function deleteUser(number: string) {
  const auth = admin_app.auth();
  auth
    .getUserByPhoneNumber(number)
    .then((userRecord: any) => {
      console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
      auth
        .deleteUser(userRecord.uid)
        .then(() => {
          console.log("Successfully deleted user");
        })
        .catch((error: any) => {
          console.log("Error deleting user:", error);
        });
    })
    .catch((error: any) => {
      console.log("Error fetching user data:", error);
    });
}
