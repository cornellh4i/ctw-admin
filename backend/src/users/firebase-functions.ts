var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

/**
 * Create a new user given their phone number
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
  admin
    .auth()
    .createUser({
      phoneNumber: number,
    })
    .then((userRecord: any) => {
      admin.auth().setCustomUserClaims(userRecord.uid, customClaims);
      console.log("Successfully created new user:", userRecord.uid);
    })
    .catch((error: any) => {
      console.log("Error creating new user: ", error);
    });
}
