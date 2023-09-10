import React from 'react';

import { uploadBytes } from 'firebase/storage';
import { useEffect } from 'react';


import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'


import { getAuth } from 'firebase/auth';

import { getStorage, ref, getDownloadURL} from "firebase/storage";
import {useState} from 'react';

import { FileInput } from '@mantine/core';
import { createStyles, Text, Title, TextInput, Button, Image, rem } from '@mantine/core';
import { initializeApp } from 'firebase/app';














// const auth = getAuth();
// const user = auth.currentUser;



var firebaseConfig = {
    apiKey: "AIzaSyBTh2cWOzmY8wqrqeS5y-uuhnzkG115hGE",
    authDomain: "haikoo-bc326.firebaseapp.com",
    databaseURL: "https://haikoo-bc326-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "haikoo-bc326",
    storageBucket: "haikoo-bc326.appspot.com",
    messagingSenderId: "784052480580",
    appId: "1:784052480580:web:9a9e5e50cb8df5def9ea11"
  };

//   const firebase = initializeApp(firebaseConfig);
const firebaseApp = initializeApp(firebaseConfig);

// const UploadPic = (props) => {

//     const auth = getAuth();
//     const storage = getStorage();

//     const [imageUpload , setImageUpload] = useState(null)
   
//     const user = auth.currentUser;
//     const uploadImage = () => {
//         console.log(imageUpload)
//         if(imageUpload == null) return;
//         const imageRef = ref(storage, `/images/${user.uid}`);
//         uploadBytes(imageRef, imageUpload).then (() =>  {
//             alert("image uploaded !");
//             props.onImageUploaded();
          
          
           
    
//         });
        
//     }
    



console.log("userID");

const UploadPic = (props) => {
    const auth = getAuth();
    const storage = getStorage(firebaseApp);
    const [imageUrl, setImageUrl] = useState(null);
  
    const [imageUpload, setImageUpload] = useState(null);
    const user = auth.currentUser;

    useEffect(() => {
        // Load the user's image URL when the component mounts
        if (user) {
          const imageRef = ref(storage, `/images/${user.uid}`);
          getDownloadURL(imageRef)
            .then((url) => {
              setImageUrl(url);
            })
            .catch((error) => {
              console.error('Error getting image URL:', error);
            });
        }
      }, [user]);
  
    const uploadImage = () => {
      console.log(imageUpload);
      if (imageUpload === null) return;
      
      const imageRef = ref(storage, `/images/${user.uid}`);
    //   getDownloadURL(imageRef)
    //   .then((url) => {
    //     setImageUrl(url);
    //   })
    //   .catch((error) => {
    //     console.error('Error getting image URL:', error);
    //   });
      
      uploadBytes(imageRef, imageUpload)
        .then(() => {
          alert('Image uploaded!');
          props.onImageUploaded();
        //   if (props.onImageUploaded) {
        //     getDownloadURL(imageRef)
        //       .then((url) => {
        //         setImageUrl(url);
        //         props.onImageUploaded(url); // Pass the URL to the parent component
        //       })
        //       .catch((error) => {
        //         console.error('Error getting image URL:', error);
        //       });
        //   }
        //       // Update the image URL after a successful upload
        // // getDownloadURL(imageRef)
        // // .then((url) => {
        // //   setImageUrl(url);
        // // })
        // .catch((error) => {
        //   console.error('Error getting image URL:', error);
        // });
        // })
        // .catch((error) => {
        //   console.error('Error uploading image:', error);
        // });
        if (props.onImageUploaded) {
            getDownloadURL(imageRef)
              .then((url) => {
                setImageUrl(url);
                props.onImageUploaded(url); // Pass the URL to the parent component
              })
              .catch((error) => {
                console.error('Error getting image URL:', error);
              });
          }
        })
        .catch((error) => {
          console.error('Error uploading image:', error);
        });
    };


    return (
        <div>
           
            <div className='main-container' >
            <div id="first_step">
        <h2>
        Upload a pic of your choice :</h2>
        
        <FileInput
       
    //   placeholder="Pick file"
    //   label="Your profile pic"
    //   onChange={(event) => {setImageUpload(event.target.files[0])}}
      type="file"
      accept="image/*"
    //   onChange={(event) => setImageUpload(event.target.files[0])}
    onChange={setImageUpload}
    />
     {/* <input type="file" onChange={(event) => {setImageUpload(event.target.files[0])}}/> */}
     <Button mr={10} mb={100} mt={10} onClick={uploadImage}> Upload Pic</Button>
     {/* <Button className="play_buttons2" >Submit</Button> */}
 {/* <button onClick={uploadImage}> Upload Pic</button> */}
  {/* <button >Submit function</button> */}
 {/* <button className="play_buttons2"  >Submit</button> */}
      </div> 
      </div>
        </div>
    );
};
// export {username};
export default UploadPic;