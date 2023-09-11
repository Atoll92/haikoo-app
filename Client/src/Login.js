
// // // Import FirebaseAuth and firebase.
// // import React from 'react';
// // import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
// // import firebase from 'firebase/compat/app';
// // import 'firebase/compat/auth';
// import StoreUserData from './Components/StoreUserData';
// // // import firebase from 'firebase/compat/app';

// // import * as firebaseui from 'firebaseui'
// // import 'firebaseui/dist/firebaseui.css'
// // import { getAuth, signInWithEmailAndPassword } from "firebase/auth";



// // // Configure Firebase.
// // const config = {
// //   apiKey: "AIzaSyBTh2cWOzmY8wqrqeS5y-uuhnzkG115hGE",
// //   authDomain: "haikoo-bc326.firebaseapp.com",
// //   databaseURL: "https://haikoo-bc326-default-rtdb.europe-west1.firebasedatabase.app",
// //   projectId: "haikoo-bc326",
// //   storageBucket: "haikoo-bc326.appspot.com",
// //   messagingSenderId: "784052480580",
// //   appId: "1:784052480580:web:9a9e5e50cb8df5def9ea11"
// // };
// // firebase.initializeApp(config);

// // // Configure FirebaseUI.
// // const uiConfig = {
// //   // Popup signin flow rather than redirect flow.
// //   signInFlow: 'popup',
// //   // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
// //   signInSuccessUrl: '/signedIn',
// //   // We will display Google and Facebook as auth providers.
// //   signInOptions: [
// //     firebase.auth.GoogleAuthProvider.PROVIDER_ID,
// //    firebase.auth.EmailAuthProvider.PROVIDER_ID
      
    
// //   ],

// //   callbacks: {
// //     // This callback will be called when a user successfully signs in
// //     signInSuccessWithAuthResult: function(authResult) {
// //       // Call your custom function after a successful sign-in
// //       StoreUserData();

// //       // Continue with the default behavior (e.g., redirect)
// //       return true;
// //     },
// //   },
  
// // };





// // function SignInScreen() {
// //   return (
// //     <div>
// //       {/* <h1>My App</h1>
// //       <p>Please sign-in:</p> */}
// //       <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
// //     </div>
// //   );
// // }

// // export default SignInScreen
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import { getAuth } from 'firebase/auth';

// Import your custom function
// import StoreUserData from './StoreUserData'; // Adjust the import path as needed

// Configure Firebase.
const config = {

  apiKey: "AIzaSyBTh2cWOzmY8wqrqeS5y-uuhnzkG115hGE",
  authDomain: "haikoo-bc326.firebaseapp.com",
  databaseURL: "https://haikoo-bc326-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "haikoo-bc326",
  storageBucket: "haikoo-bc326.appspot.com",
  messagingSenderId: "784052480580",
  appId: "1:784052480580:web:9a9e5e50cb8df5def9ea11"

};
firebase.initializeApp(config);

// Configure FirebaseUI.
const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/signedIn',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccessWithAuthResult: function(authResult) {
      // Call your custom function after a successful sign-in
  

      // Continue with the default behavior (e.g., redirect)
      return true;
    },
  },
};

function SignInScreen() {
  return (
    <div>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
}

export default SignInScreen;
