import React, { useState } from "react";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDST9Sye6qlngkmXLA9GW52oRWa4gACQ6A",
  authDomain: "clean-the-world-50a0c.firebaseapp.com",
  projectId: "clean-the-world-50a0c",
  storageBucket: "clean-the-world-50a0c.appspot.com",
  messagingSenderId: "617634651622",
  appId: "1:617634651622:web:796178f5d7c2e437afca27"
};

const LoginComponent = () => {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  auth.useDeviceLanguage();
  window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {});

  const handleSendCode = () => {
    const phoneNumber = document.getElementById('phone').value;
    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier).then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message, then sign the 
      // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
      // ...
      }).catch((error) => {
      // Error; SMS not sent 
      // ...
      console.error("Error sending SMS:", error);
      // grecaptcha.reset(window.recaptchaWidgetId);
      
      // // Or, if you haven't stored the widget ID:
      // window.recaptchVerifier.render().then(function(widgetId) {
      //   grecaptcha.reset(widgetId);
      //   })
      })
  }

  const handleConfirmCode = () => {
    const code = document.getElementById('verification-code').value;
    const confirmationResult = window.confirmationResult;

    if (confirmationResult) {
      confirmationResult.confirm(code).then((result) => {
        const user = result.user;
        console.log("User signed in successfully:", user);
      }).catch((error) => {
        console.error("Error confirming code:", error);
      });
    } else {
      console.error("Confirmation result not available");
    }
  };
  return (
    <div>
      <div id='recaptcha-container'></div>
      <input
        type="text"
        id="phone"
        placeholder="Phone Number"
      />
      <button onClick={handleSendCode}>Send Code</button>
      <input
        type="text"
        id="verification-code"
        placeholder="Verification Code"
      />
      <button onClick={handleConfirmCode}>Confirm Code</button>
    </div>
  );
};

export default LoginComponent;
