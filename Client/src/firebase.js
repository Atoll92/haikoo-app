// import firebase from 'firebase/compat/app';

import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { initializeApp } from 'firebase/app'


// const app = initializeApp({ ...firebaseConfig })

// const auth = getAuth(app)
// const firestore = getFirestore(app)
// other Firebase services

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBTh2cWOzmY8wqrqeS5y-uuhnzkG115hGE",
  authDomain: "haikoo-bc326.firebaseapp.com",
  databaseURL: "https://haikoo-bc326-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "haikoo-bc326",
  storageBucket: "haikoo-bc326.appspot.com",
  messagingSenderId: "784052480580",
  appId: "1:784052480580:web:9a9e5e50cb8df5def9ea11"
};
  // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// export Firebase so it can be used elsewhere 
 const firebase = initializeApp(firebaseConfig);
//  const firebase = initializeApp(firebaseConfig);
const auth = () => getAuth(firebase);


 const db = () => getDatabase(firebase)

 export default firebase;
// export default Firebase;



  export { db , auth}


// import { initializeApp } from "firebase/app";
// import {
//     GoogleAuthProvider,
//     getAuth,
//     signInWithPopup,
//     signInWithEmailAndPassword,
//     createUserWithEmailAndPassword,
//     sendPasswordResetEmail,
//      signOut,
//    } from "firebase/auth";
//    import {
//     getFirestore,
//      query,
//    getDocs,
//      collection,
//     where,
//      addDoc,
//      setDoc,
//      doc,
//    } from "firebase/firestore";



// const firebaseConfig = {
//     apiKey: "AIzaSyBb4lyuCg_sPZ3sWg90Qgh4FDWY_QMce8g",
//     authDomain: "the-cave-271e0.firebaseapp.com",
//     projectId: "the-cave-271e0",
//     storageBucket: "the-cave-271e0.appspot.com",
//     messagingSenderId: "1007665486927",
//     appId: "1:1007665486927:web:c24958b542ab8de5aade3a"
//   };

//   const firebase = initializeApp(firebaseConfig);
//   const auth = getAuth(firebase);
//   const db = getFirestore(firebase);

//   export default firebase;
