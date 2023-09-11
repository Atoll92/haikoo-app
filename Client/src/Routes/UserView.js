

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
import { doc } from 'firebase/firestore';
import { getDoc } from 'firebase/firestore';

import { Grid, Title } from '@mantine/core';
import { SimpleGrid } from '@mantine/core';
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import Footer1 from './Footer1';
    import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import FavoriteHaikoos from '../Components/FavoriteHaikoos';







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
  const [friends, setFriends] = useState([]);


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
    const [friendIds, setFriendIds] = useState([]);
    const [friendNames, setFriendNames] = useState({}); 
    
   
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

  
    


//    refreshImage() {


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

      // const userId = current_user.uid;
  
      // fetchUserSocialData(userId)
      //   .then((friends) => {
      //     console.log('User Friends Data:', friends);
      //     setFriends(friends); // Update the friends state with the fetched data
      //   })
      //   .catch((error) => {
      //     console.error('Error:', error);
      //   });
      const userId = 'gzkdF749UzabZFe3ihJatYzJ21l1'; // Replace with the actual user's ID
      retrieveAllFriendIds(userId)
        .then((friendIds) => {
          setFriendIds(friendIds);
          retrieveFriendNames(friendIds);
        })
        .catch((error) => {
          console.error('Error:', error);
        });

//       const userId = 'gzkdF749UzabZFe3ihJatYzJ21l1'; // Replace with the actual user's ID
// const friendIndex = 'friend_1'; // Replace with the index you want to retrieve
// retrieveFriendId(userId, friendIndex)
//   .then((friendId) => {
//     if (friendId !== null) {
//       console.log(`Friend ID at index ${friendIndex}: ${friendId}`);
//     }
//   })
//   .catch((error) => {
//     console.error('Error:', error);
//   });
   
      getDownloadURL(ref(storage, `images/${current_user.uid}`))
      .then((url) => {
        // `url` is the download URL for 'images/stars.jpg'
    
      
        // Or inserted into an <img> element
        const img = document.getElementById('userpic');
        img.setAttribute('src', url);
        console.log("image url set as attribute")
      })
      .catch((error) => {
        console.log(error)
      });

      
      // const userId = current_user.uid;
         
      
      //     fetchUserSocialData(userId)
      //       .then((friends) => {
      //         console.log('User Social Data:', friends);
      //         // Now you have the user's social data (haikoos) in the state and can display it as needed.
      //       })
      //       .catch((error) => {
      //         console.error('Error:', error);
      //       });
        
     
      // const userId = current_user.uid; // Replace with the actual user's ID
      // getHaikoosForUser(userId)
      //   .then((haikoos) => {
      //     console.log('Haikoos for the user:', haikoos);
      //   })
      //   .catch((error) => {
      //     console.error('Error:', error);
      //   });
    
  
    }
    
     
    },[current_user])

    async function retrieveAllFriendIds(userId) {
      try {
        const db = getFirestore();
        const userSocialDocRef = doc(db, 'users_social', userId);
    
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



    const retrieveFriendNames = async (friendIds) => {
      const db = getFirestore();
      const userCollection = collection(db, 'users'); // Replace 'users' with your user collection name
  
      const names = {};
  
      for (const friendId of friendIds) {
        const userDocRef = doc(userCollection, friendId);
        try {
          const userDocSnapshot = await getDoc(userDocRef);
          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            if (userData.displayName) {
              names[friendId] = userData.displayName;
            }
          }
        } catch (error) {
          console.error('Error fetching user data for friendId:', friendId, error);
        }
      }
  
      setFriendNames(names); // Update the state with friend names
    };
    // async function retrieveFriendId(userId, friendIndex) {
    //   try {
    //     const db = getFirestore();
    //     const userSocialDocRef = doc(db, 'users_social', userId);
    
    //     // Get the document data
    //     const docSnapshot = await getDoc(userSocialDocRef);
    //     if (docSnapshot.exists()) {
    //       const data = docSnapshot.data();
    //       if (data[friendIndex]) {
    //         const friendData = data[friendIndex];
    //         const friendId = friendData.friend_id;
    //         return friendId;
    //       } else {
    //         console.log(`Friend at index ${friendIndex} does not exist.`);
    //         return null;
    //       }
    //     } else {
    //       console.log('User social document does not exist.');
    //       return null;
    //     }
    //   } catch (error) {
    //     console.error('Error retrieving friend_id: ', error);
    //     return null;
    //   }
    // }


    // const fetchUserSocialData = async (userId) => {
    //   const db = getFirestore();
    //   const haikoosCollection = collection(db, 'users_social');
    //   const q = query(haikoosCollection, where('user_uid', '==', userId));
    
    //   try {
    //     const querySnapshot = await getDocs(q);
    //     const friends = [];
    
    //     querySnapshot.forEach((doc) => {
    //       const data = doc.data();
    //       const haikooFollowing = data.haikoo_following;
    
    //       if (haikooFollowing) {
    //         Object.keys(haikooFollowing).forEach((friendId) => {
    //           // Extract individual friend data based on friend IDs
    //           const friendData = haikooFollowing[friendId];
    //           friends.push({ friend_id: friendId, ...friendData });
    //         });
    //       }
    //     });
    
    //     console.log('User Friends:', friends);
    //     return friends;
    //   } catch (error) {
    //     console.error('Error fetching user social data:', error);
    //     return [];
    //   }
    // };


    // useEffect(() => {
    //   if (current_user) {
    //     const userId = current_user.uid;
  
    //     fetchUserSocialData(userId)
    //       .then((friends) => {
    //         console.log('User Friends Data:', friends);
    //         setFriends(friends); // Update the friends state with the fetched data
    //       })
    //       .catch((error) => {
    //         console.error('Error:', error);
    //       });
    //   }
    // }, [current_user]);
  
    
    // const fetchUserSocialData = async (userId) => {
    
    //   const db = getFirestore();
    //   const haikoosCollection = collection(db, 'users_social');
    //   const q = query(haikoosCollection, where('user_id', '==', userId));
    
    //   try {
    //     const querySnapshot = await getDocs(q);
    //     const friends = [];
    
    //     querySnapshot.forEach((doc) => {
    //       const data = doc.data();
    //       // You can access fields from the document data, e.g., data.title, data.content, etc.
    //       friends.push(data.friend_id);
    //     });
    //     console.log("newIQ" + friends)
    //     return friends;
    //   } catch (error) {
    //     console.error('Error fetching user social data:', error);
    //     return [];
    //   }
    // };

    // async function getHaikoosForUser(userId) {
    //   try {
    //     const db = getFirestore();
    //     const haikoosCollection = collection(db, 'users_social'); // Replace 'Haikoos' with the actual name of your collection

    //     // Query the Haikoos collection to get haikoos created by the specified user
    //     const q = query(haikoosCollection, where('user_id', '==', userId));

    //     // Get the documents that match the query
    //     const querySnapshot = await getDocs(q);

    //     // Extract the haikoo data from the query results
    //     const haikoos = querySnapshot.docs.map((doc) => {
    //       const data = doc.data();
    //       const haikooId = doc.haikoo_id;
    //       return { haikooId, ...data };
    //     });

    //     console.log('Friend Haikoos:', haikoos); // Add this line for debugging

    //     setFriendHaikoos(haikoos);
    //     console.log("friendHaikoos" + friendHaikoos)
    //     return haikoos;
    //   } catch (error) {
    //     console.error('Error fetching haikoos for user: ', error);
    //     return [];
    //   }
    // }




  

    if (!isSignedIn) {
      return;
    }

    const handleImageUploaded = (imageUrl) => {
      // Do something with the new image URL, such as updating the UI
      // or saving it to your database.
      const img = document.getElementById('userpic');
        img.setAttribute('src', imageUrl);
      console.log('New image URL:', imageUrl);
    };
    

// async function getHaikoosForUser(userId) {
//   try {
//     const db = getFirestore();
//     const haikoosCollection = collection(db, 'users_social'); // Replace 'Haikoos' with the actual name of your collection
    
//     // Query the Haikoos collection to get haikoos created by the specified user
//     const q = query(haikoosCollection, where('user_id', '==', userId));

//     // Get the documents that match the query
//     const querySnapshot = await getDocs(q);

//     // Extract the haikoo data from the query results
//     const haikoos = querySnapshot.docs.map((doc) => {
//       const data = doc.data();
//       const haikooId = doc.id;
//       return { haikooId, ...data };
//     });
//     setFriendHaikoos(haikoos);
//     return haikoos;
//   } catch (error) {
//     console.error('Error fetching haikoos for user: ', error);
//     return [];
//   }
// }

// // Usage example
// const userId = user.uid; // Replace with the actual user's ID
// getHaikoosForUser(userId)
//   .then((haikoos) => {
//     console.log('Haikoos for the user:', haikoos);
//   })
//   .catch((error) => {
//     console.error('Error:', error);
//   });


      
    return (
        <div id='userview'>
          

          <Loginalt/>
          <Text>Welcome {firebase.auth().currentUser.displayName}! <br/>You are now signed-in!</Text>
            <Text weight={900} mb={50} mt={50} size="xl" m="auto">My Profile</Text>
            {/* <img height={160} src={ "/" + firebase.auth().currentUser.photoURL}/> */}
      <Card w={600} m="auto" shadow="sm" padding="lg" mw={800} radius="md" withBorder>
      <Card.Section>
        {/* <Image 
        
      
        height={160}
         
       
        
        /> */}
        <img   id="userpic"  ></img>
        
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{firebase.auth().currentUser.displayName}</Text>
        <Badge color="pink" variant="light">
          Live
        </Badge>
      </Group>

      <Text size="sm" color="dimmed">
      {firebase.auth().currentUser.email}<br></br>
      Score social :  {my_score} <br></br>
      Nombre total de haikoos publiés :  {my_haikoos.length}<br></br>
      id : {firebase.auth().currentUser.uid}


      </Text>

      <Button variant="light" color="blue" fullWidth mt="md" radius="md">
       Review my info
      </Button>
      <UploadPic onImageUploaded={handleImageUploaded}/>
    </Card>
            {/* <p>{firebase.auth().currentUser.displayName}</p>
            <p>{firebase.auth().currentUser.email}</p>
            */}
           
            {/* <img src={ "/" + firebase.auth().currentUser.photoURL}/>
            <p>{firebase.auth().currentUser.uid}</p> */}
           
            <div className='Myhaikoos'>
            <h1>My haikoos</h1> 
          
     
       
       <Grid  spacing="lg" justify="center" cols={3} gutterXs={50} gutterMd={50} gutterXl={50}>{my_haikoos.map((haikoo, i) =>
                 <Grid.Col m={10} span={3} bg="white" key={i}><strong>{haikoo.title}</strong><br/> " {haikoo.content}" by <i>{haikoo.author}</i><br/><Text>{haikoo.social_score}</Text></Grid.Col>
            )}</Grid>
            </div>

            <div className='Myfriends'>
            <h1>My friends</h1> 
            <Grid  spacing="lg" justify="center" cols={3} gutterXs={50} gutterMd={50} gutterXl={50}>
              {friendIds.map((friendId, index) => (
                 <Grid.Col m={10} span={3} bg="white" key={index}>
                   <strong>
                 {friendNames[friendId] ? (
                   friendNames[friendId]
                 ) : (
                   `User ${friendId}` // Display a default name or message if the name is not available
                 )}
                 </strong></Grid.Col>
            ))}</Grid>
            </div>

            <FavoriteHaikoos/>
            
          
       
            <Footer1></Footer1>
        </div>
    );
};

export default UserView; 