import React, { useEffect, useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { Link } from 'react-router-dom';
import { Button, Header, Menu, Tabs, Title } from '@mantine/core';
import logo from '../media/create-a-logo-for-a-browser-word-game-named-haikoo-inspired-by-haiku-and-zen-philosophy-professio.png'
// import { MenuLabel } from '@mantine/core/lib/Menu/MenuLabel/MenuLabel';
import StoreUserData from '../Components/StoreUserData';



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
    // signInSuccessWithAuthResult: () => false,

   
      signInSuccessWithAuthResult: function(authResult) {
        // Call your custom function after a successful sign-in
        console.log("signedinwithauthsuccess")
        StoreUserData();
  
        // Continue with the default behavior (e.g., redirect)
        return true;
      },
    
  },
};

function Loginalt(props) {
  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.
  const [userDataStored, setUserDataStored] = useState(false);

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      setIsSignedIn(!!user);
      setUserDataStored(false);
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);


  const handleUserDataStored = () => {
    // This function will be called from StoreUserData component
    setUserDataStored(true);
    console.log("data stored")
  };

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
         <Link  to="/"> <img id="logo" src={logo} alt="Logo" /></Link>
           
             
         {/* <Menu> */}
          <div id="menubar">
         
          <h2 ><Link onClick={props.show_userview} to="/account">My Account</Link></h2>
          <h2><Link to="/explore">Explore</Link> </h2>
          <h2> <Link  to="/leaderboard"> Leaderboard</Link></h2>
          <h2><Link to="/culture">Culture</Link> </h2>
          <h2 id="logoutred" onClick={props.hideuserview}> <Link onClick={() => firebase.auth().signOut()} to="/">Sign-out</Link></h2>
          
          </div>
          <StoreUserData onUserDataStored={handleUserDataStored} />
        
      
        
       
       </Header>
      // </div>
    );

  }

}

export default Loginalt;
