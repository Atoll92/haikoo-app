// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTh2cWOzmY8wqrqeS5y-uuhnzkG115hGE",
  authDomain: "haikoo-bc326.firebaseapp.com",
  databaseURL: "https://haikoo-bc326-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "haikoo-bc326",
  storageBucket: "haikoo-bc326.appspot.com",
  messagingSenderId: "784052480580",
  appId: "1:784052480580:web:9a9e5e50cb8df5def9ea11"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

console.log("server started")

