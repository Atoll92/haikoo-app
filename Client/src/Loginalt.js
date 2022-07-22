import React, { useEffect, useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';


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
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
};

function Loginalt(props) {
  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      setIsSignedIn(!!user);
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  if (!isSignedIn) {
    return (
      <div>
        
        
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
       
      </div>
    );
  }
  return (
    <div className='signout'>
      
      <p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p>
      <button onClick={props.show_userview}>My Account</button>
     <button onClick={props.hideuserview}><a onClick={() => firebase.auth().signOut()}>Sign-out</a></button> 
    </div>
  );
}

export default Loginalt;