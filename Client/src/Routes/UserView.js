

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getStorage, ref } from 'firebase/storage';

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { uploadBytes } from 'firebase/storage';



import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'
import UploadPic from './UploadPic';
import Loginalt from './Loginalt';
import { getDownloadURL } from 'firebase/storage';











const storage = getStorage();


















const auth = getAuth();
const user = auth.currentUser;
// const [current_user , setCurrentUser] = React.useState(null);


// onAuthStateChanged(auth, (user) => {
//   if (user) {

//     console.log("USER")
//     console.log(user)
//     setCurrentUser(user);



//     // User is signed in, see docs for a list of available properties
//     // https://firebase.google.com/docs/reference/js/firebase.User
//     const uid = user.uid;
//     // ...
//   } else {
//     // User is signed out
//     // ...
//     console.log("NOUSER")
//   }
// });



// const user = auth.currentUser;

// if (user) {
//  console.log("usersignedin")
// } else {
//     console.log("nousersignedin")
// }




const UserView = () => {

  const [current_user , setCurrentUser] = React.useState(null);


  onAuthStateChanged(auth, (user) => {
    if (user) {
  
      console.log("USER")
      console.log(user)
      setCurrentUser(user);
  
  
  
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
  
  

    const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.
    const [my_haikoos, setMyHaikoos] = React.useState([]);
    const [my_score, setMyScore] = React.useState(0);
    // Listen to the Firebase Auth state and set the local state.
    useEffect(() => {
      const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
        setIsSignedIn(!!user);

        
         firebase.auth().currentUser.getIdToken(true).then((idToken) => {
              const response =  axios.get('https://haikoo-bc326-default-rtdb.europe-west1.firebasedatabase.app/Haikoos.json?auth=' + idToken).then(
                  (response) => {
                      let haikoo_array = Object.values(response.data);
                      var my_haikoos_locale = [];
                      if (isSignedIn) {
                        // setMyHaikoos (haikoo_array.filter(haikoo => firebase.auth().currentUser.displayName === haikoo.author))
                        //setMyHaikoos (haikoo_array)
                       
                      my_haikoos_locale = haikoo_array.filter(haikoo => firebase.auth().currentUser.displayName === haikoo.author)
                      setMyHaikoos(my_haikoos_locale)

                        // setMyScore( for (i=0;i>haikoo_array.length; i++) )
                      }
                      console.log(response)
                      console.log("haikoo_array")
                      console.log(haikoo_array)
                      console.log("fetchApi" )
                      let rnd = Math.random() * haikoo_array.length 
                      let rounded_rnd = Math.floor(rnd);

                      const CalculateScore = (mh) =>  {
                        var score = 0;
                        console.log("my_haikoos")
                        // console.log(my_haikoos)
                        console.log(mh)
                        var i;

                        for (i=0; i<mh.length; i++) {
                         score = score + mh[i].social_score
                        //  score = score + (mh[i].social_score * mh[i].score.replace(/%/g, ""))

                        }
                        console.log("score")
                        console.log(score)
                  
                        setMyScore(score)

                      }
                      CalculateScore(my_haikoos_locale)
                    
                  }
              )
            })
      });
      return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
    }, [isSignedIn]);

  
    


//   refreshImage() {


//     if(current_user) {

   
//     getDownloadURL(ref(storage, `images/${current_user.uid}`))
//     .then((url) => {
//       // `url` is the download URL for 'images/stars.jpg'
  
    
//       // Or inserted into an <img> element
//       const img = document.getElementById('userpic');
//       img.setAttribute('src', url);
//     })
//     .catch((error) => {
//       console.log(error)
//     });
//   }

// }


    useEffect( () => {
    // refreshImage()
    if(current_user) {

   
      getDownloadURL(ref(storage, `images/${current_user.uid}`))
      .then((url) => {
        // `url` is the download URL for 'images/stars.jpg'
    
      
        // Or inserted into an <img> element
        const img = document.getElementById('userpic');
        img.setAttribute('src', url);
      })
      .catch((error) => {
        console.log(error)
      });
    }
    
     
    },[current_user])




  

    if (!isSignedIn) {
      return;
    }

   
    

      
    return (
        <div id='userview'>
          

          <Loginalt/>
            <h1>My Profile</h1>
            <p>{firebase.auth().currentUser.displayName}</p>
            <p>{firebase.auth().currentUser.email}</p>
            <img id="userpic"></img>
            <UploadPic/>
            <img src={ "/" + firebase.auth().currentUser.photoURL}/>
            <p>{firebase.auth().currentUser.uid}</p>
            <p>{my_haikoos.length}</p>
            <div className='Myhaikoos'>
            <h1>My haikoos</h1>
            <li>{my_haikoos.map((haikoo, i) =>
                <ul key={i}><strong>{haikoo.title}</strong><br/> " {haikoo.content}" by <i>{haikoo.author}</i><br/><p>{haikoo.social_score}</p></ul>
            )}</li>
            </div>
           
            <h1>Favourites</h1>
            <h1>Rankings</h1>
            <p>{my_score}</p>

            
        </div>
    );
};

export default UserView; 