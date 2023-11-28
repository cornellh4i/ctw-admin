import * as admin from 'firebase-admin'
import { admin_app } from './firebase-functions'

/**
 * Modify the claim of a user given user ID and new claim
 */
export function changeClaim(uid: string, new_claim: number) {
  const claims = {
    mobile_entry: new_claim == 0,
    web_entry: new_claim == 1,
    evaluator: new_claim == 2,
    admin: new_claim == 3
  };
  admin_app.auth().setCustomUserClaims(uid, claims)
  .catch(
    () => {
      console.log("ERROR: User with uid " + uid + " not found.");
    }
  )
}

export default { changeClaim };