

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';


import { getAuth, onAuthStateChanged } from "firebase/auth";
// // Configure Firebase.
// const config = {
//     apiKey: 'AIzaSyBTh2cWOzmY8wqrqeS5y-uuhnzkG115hGE',
//     authDomain: 'haikoo-bc326.firebaseapp.com',
//   // ...
// };
// firebase.initializeApp(config);

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
    const [my_haikoos, setMyHaikoos] = React.useState([]);
    // Listen to the Firebase Auth state and set the local state.
    useEffect(() => {
      const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
        setIsSignedIn(!!user);

        

       
          const response =  axios.get('https://haikoo-bc326-default-rtdb.europe-west1.firebasedatabase.app/Haikoos.json').then(
              (response) => {
                  let haikoo_array = Object.values(response.data);
                  if (isSignedIn) {
                    setMyHaikoos (haikoo_array.filter(haikoo => firebase.auth().currentUser.displayName === haikoo.author))
                    //setMyHaikoos (haikoo_array)
                  }
                  console.log(response)
                  console.log(haikoo_array)
                  console.log("fetchApi" )
                  let rnd = Math.random() * haikoo_array.length 
                  let rounded_rnd = Math.floor(rnd);
                 
              }
          )
      });
      return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
    }, [isSignedIn]);



    if (!isSignedIn) {
      return;
    }

    return (
        <div id='userview'>

            <h1>My Profile</h1>
            <p>{firebase.auth().currentUser.displayName}</p>
            <p>{firebase.auth().currentUser.email}</p>
            <img src={ "/" + firebase.auth().currentUser.photoURL}/>
            <p>{firebase.auth().currentUser.uid}</p>
            <p>{my_haikoos.length}</p>
            <li>{my_haikoos.map((haikoo, i) =>
                <ul key={i}>"{haikoo.content}"" by <i>{haikoo.author}</i></ul>
            )}</li>
            <p></p>
            <h1>Favourites</h1>
            <h1>Rankings</h1>


        </div>
    );
};

export default UserView; 