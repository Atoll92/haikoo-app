import React, { useEffect, useState } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore'; // Import Firestore functions
import { getAuth } from 'firebase/auth';
import User from './User';
import { Grid } from '@mantine/core';

const Friends = () => {
  const [friendIds, setFriendIds] = useState([]);
  const [friendsData, setFriendsData] = useState([]);

  // Get the current user
  const auth = getAuth();
  const user = auth.currentUser;
  const userId = user ? user.uid : null;

  useEffect(() => {
    // Define the user's ID (you may get it from your authentication system)
    if (!userId) {
      console.log('No user is currently signed in.');
      return; // Exit early if no user is authenticated
    }

    const db = getFirestore();
    // Reference to the user's document in Firestore
    const userSocialDocRef = doc(db, 'users_social', userId); // Replace 'users_social' with your Firestore collection name

    // Fetch the user's social document
    async function retrieveFriendIds() {
      try {
        // Get the document data
        const docSnapshot = await getDoc(userSocialDocRef);
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          const friendIds = [];

          // Iterate through the keys of the data object
          for (const key in data) {
            if (key.startsWith('friend_')) {
              const friendData = data[key];
              if (friendData && friendData.friend_id) {
                friendIds.push(friendData.friend_id);
              }
            }
          }

          return friendIds;
        } else {
          console.log('User social document does not exist.');
          return [];
        }
      } catch (error) {
        console.error('Error retrieving friend_ids: ', error);
        return [];
      }
    }

    // Fetch and set the friend IDs
    retrieveFriendIds().then((ids) => {
      setFriendIds(ids);
    });
  }, [userId]); // Make sure to include userId in the dependency array

  useEffect(() => {
    // Fetch and set friend data for each friend ID
    const fetchFriendsData = async () => {
      const db = getFirestore();
      const friendsData = [];

      for (const friendId of friendIds) {
        const userDocRef = doc(db, 'users', friendId);
        const docSnapshot = await getDoc(userDocRef);

        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          friendsData.push(userData);
        }
      }

      setFriendsData(friendsData);
    };

    if (friendIds.length > 0) {
      fetchFriendsData();
    }
  }, [friendIds]);

  return (
    <div className='Myfriends'>
      <h1>My friends</h1>
      <Grid spacing="lg" justify="center" cols={3} gutterXs={50} gutterMd={50} gutterXl={50}>
  {friendIds.map((friendId, index) => (
    <Grid.Col m={10} span={3} bg="white" key={index}>
      <User userId={friendId} />
    </Grid.Col>
  ))}
</Grid>
    </div>
  );
};

export default Friends;
