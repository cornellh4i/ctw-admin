import React, { useState } from "react";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { initializeApp } from "firebase/app";
import './login-component.css'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};
const isValidPhoneNumber = (phoneNumber) => {
  const phoneRegex = /^\+\d{1}\s\d{3}-\d{3}-\d{4}$/;
  return phoneRegex.test(phoneNumber);
}
const LoginComponent = () => {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  auth.useDeviceLanguage();

  const handleSendCode = () => {
    
    try {
      if (!isValidPhoneNumber(phoneNumber)) {
        throw new Error("Invalid phone number format");
      }
  
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {});
      const appVerifier = window.recaptchaVerifier;
  
      signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          setConfirmationResult(confirmationResult);
          setStep(2);
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/invalid-phone-number':
              alert('Invalid phone number format');
              break;
            case 'auth/missing-phone-number':
              alert('Please enter a phone number');
              break;
            case 'auth/quota-exceeded':
              alert('SMS quota exceeded. Please try again later');
              break;
            default:
              alert('Error sending SMS. Please try again later');
          }
        });
    } catch (error) {
      alert(error.message); 
    }
  }
  

  const handleConfirmCode = () => {
    if (confirmationResult) {
      confirmationResult.confirm(verificationCode)
        .then((result) => {
          const user = result.user;
          console.log("User signed in successfully:", user);
          setLoggedIn(true);
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/invalid-verification-code':
              alert('Invalid verification code. Please try again.');
              break;
            case 'auth/missing-verification-code':
              alert('Please enter a verification code.');
              break;
            default:
              console.error('Error confirming code:', error);
              alert('An error occurred. Please try again later.');
          }
        });
    } else {
      console.error("Confirmation result not available");
      alert('Confirmation result not available. Please try again.');
    }
  };
  

  return (
    <div className="login-container">
      <h1>Log In Page</h1>
      {loggedIn ? (
        <p>Successfully logged in!</p>
      ) : (
        <>
          {step === 1 && (
            <>
              <label htmlFor="phone">Phone Number:</label>
              <input
                type="text"
                id="phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+1 XXX-XXX-XXXX"
              />
              <div id="recaptcha-container"></div>
              <button className="green-button" onClick={handleSendCode}>Send Code</button>
            </>
          )}
          {step === 2 && (
            <>
              <label htmlFor="verification-code">Verify Code:</label>
              <input
                type="text"
                id="verification-code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="Enter verification code"
              />
              <button className="green-button" onClick={handleConfirmCode}>Confirm Code</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default LoginComponent;
