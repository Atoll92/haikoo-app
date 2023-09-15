import { Card } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

const User = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const [profileImageURL, setProfileImageURL] = useState(null);

  useEffect(() => {
    // Initialize Firebase Firestore
    const db = getFirestore();

    // Reference to the user's document in Firestore
    const userDocRef = doc(db, 'users', userId); // Replace 'users' with your Firestore collection name

    // Fetch the user's document
    getDoc(userDocRef)
      .then((docSnapshot) => {
        if (docSnapshot.exists()) {
          // Retrieve the user data
          const userData = docSnapshot.data();
          setUserData(userData);
        } else {
          console.log('User document not found');
        }
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, [userId]);

  //fetch user image 
  if (userId) {
    const storage = getStorage();
    const imageRef = ref(storage, `images/${userId}`); // Adjust the path as needed

    getDownloadURL(imageRef)
      .then((url) => {
        setProfileImageURL(url);
      })
      .catch((error) => {
        console.error('Error fetching profile image:', error);
      });
  }

  return (
    <Card>
      {userData ? (
        <div className='user'>
                {profileImageURL && <img src={profileImageURL} alt="Profile" />}
          <h2> {userData.displayName}</h2>
          {/* <p>Name: {userData.displayName}</p>
          <p>ID: {userId}</p> */}
      
          {/* <p>Email: {userData.mail}</p> */}
          {/* Add more user data fields as needed */}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </Card>
  );
};

export default User;
