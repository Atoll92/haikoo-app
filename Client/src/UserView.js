

import React, { useEffect, useState } from 'react';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';


import { getAuth, onAuthStateChanged } from "firebase/auth";
// Configure Firebase.
const config = {
    apiKey: 'AIzaSyBTh2cWOzmY8wqrqeS5y-uuhnzkG115hGE',
    authDomain: 'haikoo-bc326.firebaseapp.com',
  // ...
};
firebase.initializeApp(config);

const auth = getAuth();
// const [current_user , setCurrentUser] = React.useState(null);

onAuthStateChanged(auth, (user) => {
  if (user) {

    console.log("USER")
    console.log(user)
    // setCurrentUser(user);
    


    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
    console.log("NOUSER")
  }
});



// const user = auth.currentUser;

// if (user) {
//  console.log("usersignedin")
// } else {
//     console.log("nousersignedin")
// }


   
  
const UserView = () => {

    const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.

    // Listen to the Firebase Auth state and set the local state.
    useEffect(() => {
      const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
        setIsSignedIn(!!user);
      });
      return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
    }, []);
  
    if (!isSignedIn) {
      return;
    }

    return (
        <div id='userview'>

            <h1>My Profile</h1>
            <p>{firebase.auth().currentUser.displayName}</p>
            <p>{firebase.auth().currentUser.email}</p>
            <img src={ "/" + firebase.auth().currentUser.photoURL}/>
            <h1>{firebase.auth().currentUser.uid}</h1>
            <h1>Favourites</h1>
            <h1>Rankings</h1>

            
        </div>
    );
};

export default UserView;