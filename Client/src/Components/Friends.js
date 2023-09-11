import React, { useEffect, useState } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore'; // Import Firestore functions
import { getAuth } from 'firebase/auth';
import HaikooRead from './HaikooRead';

const FavoriteHaikoos = () => {
  const [favoriteHaikooIDs, setFavoriteHaikooIDs] = useState([]);

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
    const userDocRef = doc(db, 'users_social', userId); // Replace 'users' with your Firestore collection name

    // Fetch the user's document
    getDoc(userDocRef)
      .then((docSnapshot) => {
        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          const userFavorites = userData.favorites || {}; // Assuming favorites is a field in the user's document

          // Get the Haikoo IDs from the user's favorites
          const haikooIDs = Object.keys(userFavorites);

          // Log for debugging
          console.log('User Favorites:', haikooIDs);

          // Set the Haikoo IDs in state
          setFavoriteHaikooIDs(haikooIDs);
        } else {
          console.log('User document does not exist.');
        }
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, [userId]); // Make sure to include userId in the dependency array

  return (
    <div>
      <h2>User's Favorite Haikoo IDs:</h2>
      <li id="haikoopast">
  {favoriteHaikooIDs.map((haikooID, index) => (
    <HaikooRead key={index} haikooID={haikooID} />
  ))}
</li>
      {/* <ul>
        {favoriteHaikooIDs.map((haikooID) => (
   
          <li key={haikooID}>{haikooID}</li>
        ))}
      </ul> */}
    </div>
  );
};

export default FavoriteHaikoos;
