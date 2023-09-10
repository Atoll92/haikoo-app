import React, { useEffect, useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { Link } from 'react-router-dom';
import { Button, Header, Menu, Tabs, Title } from '@mantine/core';
import logo from '../media/create-a-logo-for-a-browser-word-game-named-haikoo-inspired-by-haiku-and-zen-philosophy-professio.png'
// import { MenuLabel } from '@mantine/core/lib/Menu/MenuLabel/MenuLabel';



// Configure Firebase.
// const config = {
//   apiKey: "AIzaSyBTh2cWOzmY8wqrqeS5y-uuhnzkG115hGE",
//   authDomain: 'haikoo-bc326.firebaseapp.com',
//   projectId: "haikoo-bc326",
//   storageBucket: "haikoo-bc326.appspot.com",
//   // ...
// };
// firebase.initializeApp(config);
// const db = firebase.firestore();
  


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
         <Header id="header">
        <img id="logo" src={logo} alt="Logo" />
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </Header>
      </div>
    );
  }

  if(isSignedIn) {
    return (
      // <div className='signout'>
        <Header id="header">
          <img id="logo" src={logo} alt="Logo" />
           
             
         {/* <Menu> */}
          <div id="menubar">
          <Title ><Link to="/" > Home</Link></Title>
          <Title ><Link onClick={props.show_userview} to="/account">My Account</Link></Title>
          <Title onClick={props.hideuserview}> <Link onClick={() => firebase.auth().signOut()} to="/">Sign-out</Link></Title>
          </div>
         {/* </Menu> */}
      
        
       
       </Header>
      // </div>
    );

  }

}

export default Loginalt;
