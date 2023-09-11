import React, { useEffect } from 'react';
import { useState } from "react";
import { animated } from "react-spring";
import { getDatabase, ref, onValue, runTransaction} from "firebase/database";
import { getApps } from "firebase/app";
import { getDownloadURL } from 'firebase/storage';
import { getStorage } from 'firebase/storage';
import { ref as sRef } from 'firebase/storage';
import Loginalt from './Loginalt';
import Footer1 from './Footer1';
import { Button } from '@mantine/core';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { collection } from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';
import { addDoc } from 'firebase/firestore';
import { doc } from 'firebase/firestore';
import { updateDoc } from 'firebase/firestore';
import { serverTimestamp } from 'firebase/database';
import {exists} from 'firebase/firestore'
import { get } from 'firebase/database';
import { getDoc } from 'firebase/firestore';
import { DocumentReference } from 'firebase/firestore';
import { setDoc } from 'firebase/firestore';

const storage = getStorage();

const Leaderboard = () => {

    const [fetched_haikoo, setFetchedHaikoo] = React.useState([]);
    const auth = getAuth();
const user = auth.currentUser;

    React.useEffect(() => {
        fetchHaikoos()
       
      }, []);
    
      async function fetchHaikoos(){
        console.log("begin fetchHaikoos")
        const db = getDatabase();
        const haikoos = ref(db, 'Haikoos/');
        onValue(haikoos, (snapshot) => {
            console.log("got value")
            const data = snapshot.val();
           
            let haikoo_array = Object.values(data);
            // let randomId1 = Math.floor(Math.random() * haikoo_array.length) 
            // let randomId2 = Math.floor(Math.random() * haikoo_array.length) 
            // while(randomId1 === randomId2){
            //   randomId2 = Math.floor(Math.random() * haikoo_array.length) 
            // }
            //let HaikooDuo = Math.floor(random);
            let haikoo_ids = Object.keys(data);
            for (var i = 0; i < haikoo_array.length; i++) {
              haikoo_array[i].id = haikoo_ids[i];
            }

             haikoo_array = haikoo_array.sort((A,B) => (B.social_score - A.social_score))


    
            // var twoRandomHaikoo = [
            //   haikoo_array[randomId1],haikoo_array[randomId2],
            // ]
    
            // console.log(twoRandomHaikoo);
            setFetchedHaikoo(haikoo_array);
            fetchImage(); 

    //         getDownloadURL(ref(storage, `images/${current_user.uid}`))
    //   .then((url) => {
    //     // `url` is the download URL for 'images/stars.jpg'
    
      
    //     // Or inserted into an <img> element
    //     const img = document.getElementById('userpic');
    //     img.setAttribute('src', url);
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //   });
    // }
        });
       
       
      }

      // function fetchImage() {
      //   for (var i = 0; i < fetched_haikoo.length; i++) {
      //     var userID = fetched_haikoo[i].user_id
      //     // haikoo_array[i].id = haikoo_ids[i];
      //     getDownloadURL(sRef(storage, `images/${fetched_haikoo[i].user_id}`))
          
      //     .then((url) => {
      //       // `url` is the download URL for 'images/stars.jpg'
        
          
      //       // Or inserted into an <img> element
      //       const img = document.getElementById(userID);
      //       img.setAttribute('src', url);
      //     })
      //     .catch((error) => {
      //       console.log(error)
      //     });
      //   }
      // }

      // function fetchImage() {
      //   const imagePromises = fetched_haikoo.map((haikoo) => {
      //     return new Promise((resolve, reject) => {
      //       getDownloadURL(sRef(storage, `images/${haikoo.user_id}`))
      //         .then((url) => {
      //           resolve({ user_id: haikoo.user_id, url });
      //         })
      //         .catch((error) => {
      //           reject(error);
      //         });
      //     });
      //   });
      
      //   Promise.all(imagePromises)
      //     .then((imageData) => {
      //       // Now you have an array of user_id and image URL pairs
      //       // Update the corresponding img elements with their respective URLs
      //       imageData.forEach((data) => {
      //         const img = document.getElementById(data.user_id);
      //         if (img) {
      //           img.setAttribute('src', data.url);
      //         }
      //       });
      //     })
      //     .catch((error) => {
      //       console.log(error);
      //     });
      // }
      async function follow_function(haikoo) {
        try {
          const db = getFirestore();
          const userSocialDocRef = doc(db, 'users_social', user.uid); // Replace 'user.uid' with the actual user's ID
          
          // Get the current friend count from the document (if it exists)
          const docSnapshot = await getDoc(userSocialDocRef);
          let friendCount = 1; // Default to 1 if no friends exist
          
          if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            // Determine the current friend count based on the number of keys starting with 'friend_'
            friendCount = Object.keys(data).filter(key => key.startsWith('friend_')).length + 1;
          }
      
          // Define the data to be added or updated
          const newIndex = `friend_${friendCount}`;
          const data = {
            [newIndex]: {
              friend_id: haikoo.user_id,
              timestamp: Timestamp.now(),
              // Add other haikoo-related data as needed
            },
          };
      
          // Use setDoc with merge:true to create or update the document
          await setDoc(userSocialDocRef, data, { merge: true });
      
          console.log(`Followed haikoo with ID ${haikoo.user_id}`);
        } catch (error) {
          console.error('Error following haikoo: ', error);
        }
      }

      // async function follow_function(haikoo) {
      //   try {
      //     const db = getFirestore();
      //     const userSocialDocRef = doc(db, 'users_social', user.uid); // Replace 'user.uid' with the actual user's ID
      
      //     // Define the data to be added or updated
      //     const data = {
      //       // [`friend.${haikoo.id}`]: {
      //       [`friend.${haikoo.id}`]: {
      //         friend_id: haikoo.id,
      //         timestamp: Timestamp.now(),
      //         // Add other haikoo-related data as needed
      //       },
      //     };
      
      //     // Use setDoc with merge:true to create or update the document
      //     await setDoc(userSocialDocRef, data, { merge: true });
      
      //     console.log(`Followed haikoo with ID ${haikoo.id}`);
      //   } catch (error) {
      //     console.error('Error following haikoo: ', error);
      //   }
      // }

      

      // async function follow_function(haikoo) {
      //   try {
      //     const db = getFirestore();
      //     const userSocialDocRef = doc(db, 'users_social', user.uid); // Replace 'user.uid' with the actual user's ID
      
      //     // Check if the document exists
      //     // const docExists = await exists(userSocialDocRef);
      //     // const docExists = await get(userSocialDocRef) != null;
      //     const docExists = await getDoc(userSocialDocRef);
          
          
      //     if (docExists) {
      //       // Update the user's social data by adding a new entry for the followed haikoo
      //       await updateDoc(userSocialDocRef, {
      //         [`haikoo_following.${haikoo.id}`]: {
      //           timestamp: serverTimestamp(),
      //           // Add other haikoo-related data as needed
      //         },
      //       });
      
      //       console.log(`Followed haikoo with ID ${haikoo.id}`);
      //     } else {
      //       console.log(`User document does not exist: ${user.uid}`);
      //     }
      //   } catch (error) {
      //     console.error('Error following haikoo: ', error);
      //   }
      // }

      // async function follow_function(haikoo) {
      //   try {
      //     const db = getFirestore();
      //     const userSocialDocRef = doc(db, 'users_social', user.uid); // Replace 'user.uid' with the actual user's ID
      
      //     // Update the user's social data by adding a new entry for the followed haikoo
      //     await updateDoc(userSocialDocRef, {
      //       [`haikoo_following.${haikoo.id}`]: {
      //         timestamp: serverTimestamp(),
      //         // Add other haikoo-related data as needed
      //       },
      //     });
      
      //     console.log(`Followed haikoo with ID ${haikoo.id}`);
      //   } catch (error) {
      //     console.error('Error following haikoo: ', error);
      //   }
      // }

      // async function follow_function(haikoo) {
      //   try {
      //     const db = getFirestore();
      //     const followedHaikooCollection = collection(db, 'users_social');
      
      //     // Create a document with user_id, haikoo_id, and timestamp
      //     const followData = {
      //       // user_id: user.uid,
      //       haikoo_id: haikoo.user_id, // Assuming haikoo has an ID field
      //       timestamp: Timestamp.now(),
      //     };
      
      //     // Add the document to the collection
      //     const docRef = await addDoc(followedHaikooCollection, followData);
      //     console.log('Followed haikoo with ID: ', docRef.id);
      //   } catch (error) {
      //     console.error('Error following haikoo: ', error);
      //   }
      // }

      // function follow_function(haikoo) {

      //   alert("followed" + " " + haikoo.author )
      // }
      function fetchImage() {
        fetched_haikoo.forEach((haikoo) => {
          getDownloadURL(sRef(storage, `images/${haikoo.user_id}`))
            .then((url) => {
              const img = document.getElementById(haikoo.user_id);
              if (img) {
                img.setAttribute('src', url);
              }
            })
            .catch((error) => {
              if (error.code === 'storage/object-not-found') {
                // Handle missing image gracefully, e.g., by displaying a placeholder image.
                const img = document.getElementById(haikoo.user_id);
                if (img) {
                  // Set a placeholder image or a default image URL
                  img.setAttribute('src', '');
                }
              } else {
                // Handle other errors
                console.log(error);
              }
            });
        });
      }
    
    return (
        <div>
          <Loginalt></Loginalt>
          <button onClick={fetchImage}>fetch image</button>
            <li id="haikoopast">
        {fetched_haikoo.map((haikoo, i) => (
          <animated.ul
            // style={{
            //   opacity: selected[i] ? 1 : 0.9,
            //   zIndex: selected[i] ? 98 : 1,
            // }}
            // onClick={() => SelectHaikoo(i,haikoo.id)}
            key={i}
            className={"haikoo_cards"}
          >
            <h1 className="title_haikoo">{haikoo.title}</h1>
            <p className="haikoo_text">"{haikoo.content}"</p>
            {/* <p className="haikoo_text">"{haikoo.id}"</p> */}
            <br></br>
            <span>
              <Button onClick={() => follow_function(haikoo)}>follow</Button>
            <i> by {haikoo.author}</i><img className="miniature_pic" id={haikoo.user_id} /></span>
            <p id="technical_score">{haikoo.score}</p>
            <p id="popular_score">{haikoo.social_score}</p>
            
            {/* id={fetched_haikoo[i].user_id} */}
          </animated.ul>
        ))}
      </li>
      <Footer1></Footer1>
        </div>
        
    );
};

export default Leaderboard;