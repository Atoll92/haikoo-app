// import React, { useEffect, useState } from 'react';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useState } from 'react';
import { useEffect } from 'react';

function StoreUserData({ onUserDataStored }) {
  const [isDataStored, setIsDataStored] = useState(false);

  useEffect(() => {
    const db = getFirestore();
    const auth = getAuth();

    // Get the currently signed-in user
    const user = auth.currentUser;

    if (user) {
      // Assuming you have retrieved the display name somehow
      const displayName = user.displayName; // Replace with the actual display name

      // Define a Firestore document reference for the user
      const userDocRef = doc(db, 'users', user.uid); // 'users' is the name of your collection

      // Create an object with the user's display name
      const userData = {
        displayName: displayName,
        userID: user.uid,
      };

      // Set the user's display name in the Firestore document
      setDoc(userDocRef, userData)
        .then(() => {
          console.log('User display name stored in Firestore successfully');
          setIsDataStored(true); // Update state to indicate data is stored
          onUserDataStored(); // Call the provided callback
        })
        .catch((error) => {
          console.error('Error storing user display name:', error);
        });
    }
  }, [onUserDataStored]); // Include onUserDataStored in the dependency array

  return (
    <div>
      {isDataStored ? (
        <div>User data stored successfully.</div>
      ) : (
        <div>Storing user data...</div>
      )}
    </div>
  );
}

export default StoreUserData;
