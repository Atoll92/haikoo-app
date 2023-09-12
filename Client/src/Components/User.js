import { Card } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const User = ({ userId }) => {
  const [userData, setUserData] = useState(null);

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

  return (
    <Card>
      {userData ? (
        <div>
          <h2>User Information</h2>
          <p>Name: {userData.displayName}</p>
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
