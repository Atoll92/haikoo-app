
// Import FirebaseAuth and firebase.
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


// Configure Firebase.
const config = {
  apiKey: 'AIzaSyBTh2cWOzmY8wqrqeS5y-uuhnzkG115hGE',
  authDomain: 'haikoo-bc326.firebaseapp.com',
  // ...
};
firebase.initializeApp(config);

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/signedIn',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
   firebase.auth.EmailAuthProvider.PROVIDER_ID
      
    
  ],
};



// const auth = getAuth();
// signInWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in 
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//   });


function SignInScreen() {
  return (
    <div>
      {/* <h1>My App</h1>
      <p>Please sign-in:</p> */}
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
}

export default SignInScreen