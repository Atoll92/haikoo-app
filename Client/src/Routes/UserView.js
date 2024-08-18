import React, { useEffect, useState } from 'react';
import axios from 'axios';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { Grid, Text, Badge, Button, Group, Card } from '@mantine/core';
import UploadPic from './UploadPic';
import Loginalt from './Loginalt';
import Footer1 from './Footer1';
import FavoriteHaikoos from '../Components/FavoriteHaikoos';
import Friends from '../Components/Friends';
import { loadStripe } from '@stripe/stripe-js';
import StripeBuyButton from '../Components/StripeBuyButton';

// Initialize Firebase
const stripePromise = loadStripe('your-stripe-publishable-key');
const storage = getStorage();
const firestore = getFirestore();
const auth = firebase.auth();

const UserView = () => {
  const [clientSecret, setClientSecret] = useState(null);
  const [current_user, setCurrentUser] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [my_haikoos, setMyHaikoos] = useState([]);
  const [my_score, setMyScore] = useState(0);
  const [customerId, setCustomerId] = useState(null);

  // Function to create a payment intent and save it to Firestore
  const createPaymentIntent = async () => {
    const user = firebase.auth().currentUser;
    if (!user) {
      console.error("No user is signed in!");
      return;
    }

    const paymentRef = doc(firestore, `customers/${user.uid}/payments`, "paymentIntentId");

    try {
      await setDoc(paymentRef, {
        amount: 1000, // Amount in smallest currency unit (cents)
        currency: 'usd',
        status: 'requires_payment_method', // Initial status
      });
      console.log('Payment document created successfully!');
    } catch (error) {
      console.error('Error creating payment document:', error);
    }
  };

  // Function to fetch the client secret from Firestore
  const fetchClientSecret = async () => {
    const user = firebase.auth().currentUser;
    if (!user) {
      console.error("No user is signed in!");
      return;
    }

    const paymentRef = doc(firestore, `customers/${user.uid}/payments`, "paymentIntentId");

    try {
      const paymentDoc = await getDoc(paymentRef);
      if (paymentDoc.exists()) {
        const clientSecret = paymentDoc.data().client_secret;
        console.log('Client secret:', clientSecret);
        setClientSecret(clientSecret);
      } else {
        console.error('No such payment document!');
      }
    } catch (error) {
      console.error('Error fetching client secret:', error);
    }
  };

  // Function to fetch customer data from Firestore
  const fetchCustomerData = async (uid) => {
    try {
      const customerRef = doc(firestore, 'customers', uid);
      const customerDoc = await getDoc(customerRef);
      
      if (customerDoc.exists()) {
        // Set the customerId in the state
        setCustomerId(customerDoc.id);
      } else {
        // Customer doesn't exist, create a new customer record in Firestore
        const user = firebase.auth().currentUser;
        await setDoc(customerRef, {
          name: user.displayName,
          email: user.email,
          stripeCustomerId: null, // Will be updated when creating a customer on Stripe
        });

        console.log('Customer document created successfully!');
        setCustomerId(uid);  // Set the created customerId
      }
    } catch (error) {
      console.error('Error fetching or creating customer data:', error);
    }
  };

  // Handle user authentication state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        console.log("User signed in:", user);
        setCurrentUser(user);
        setIsSignedIn(true);
        await fetchCustomerData(user.uid); // Ensure customer data is fetched/created
      } else {
        console.log("User not signed in.");
        setIsSignedIn(false);
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  // Fetch haikoos and calculate score
  useEffect(() => {
    if (!isSignedIn || !current_user) return;

    firebase.auth().currentUser.getIdToken(true).then((idToken) => {
      axios.get('https://haikoo-bc326-default-rtdb.europe-west1.firebasedatabase.app/Haikoos.json?auth=' + idToken)
        .then((response) => {
          const haikoo_array = Object.values(response.data);
          const my_haikoos_locale = haikoo_array.filter(haikoo => firebase.auth().currentUser.displayName === haikoo.author);
          setMyHaikoos(my_haikoos_locale);
          const score = my_haikoos_locale.reduce((acc, haikoo) => acc + haikoo.social_score, 0);
          setMyScore(score);
        })
        .catch(error => console.error('Error fetching haikoos:', error));
    });
  }, [isSignedIn, current_user]);

  // Fetch and set user image URL
  useEffect(() => {
    if (current_user) {
      getDownloadURL(ref(storage, `images/${current_user.uid}`))
        .then((url) => {
          const img = document.getElementById('userpic');
          if (img) img.setAttribute('src', url);
          console.log("Image URL set as attribute");
        })
        .catch((error) => console.log('Error fetching image URL:', error));
    }
  }, [current_user]);

  if (!isSignedIn) {
    return null; // Render nothing if the user is not signed in
  }

  const handleImageUploaded = (imageUrl) => {
    const img = document.getElementById('userpic');
    if (img) img.setAttribute('src', imageUrl);
    console.log('New image URL:', imageUrl);
  };

  return (
    <div id='userview'>
      <Loginalt />
      <Text>Welcome {firebase.auth().currentUser.displayName}!<br />You are now signed-in!</Text>
      <Text weight={900} mb={50} mt={50} size="xl" m="auto">My Profile</Text>
      <Card w={600} m="auto" shadow="sm" padding="lg" mw={800} radius="md" withBorder>
        <Card.Section>
          <img id="userpic" alt="User" />
        </Card.Section>
        <Button variant="light" color="blue" fullWidth mt="md" radius="md" onClick={createPaymentIntent}>
          Create Payment Intent
        </Button>
        <StripeBuyButton />
        <Card.Section>
          {clientSecret && (
            <Text mt={20} color="green">
              Client Secret: {clientSecret}
            </Text>
          )}
        </Card.Section>
        <Group position="apart" mt="md" mb="xs">
          <Text weight={500}>{firebase.auth().currentUser.displayName}</Text>
          <Badge color="pink" variant="light">Live</Badge>
        </Group>
        <Text size="sm" color="dimmed">
          {firebase.auth().currentUser.email}<br />
          Score social: {my_score}<br />
          Nombre total de haikoos publiés: {my_haikoos.length}<br />
          id: {firebase.auth().currentUser.uid}<br />
          display name: {firebase.auth().currentUser.displayName}<br />
          customerId: {customerId}<br />
        </Text>
        <Button variant="light" color="blue" fullWidth mt="md" radius="md">Review my info</Button>
        <UploadPic onImageUploaded={handleImageUploaded} />
      </Card>
      <div className='Myhaikoos'>
        <h1>My haikoos</h1>
        <Grid spacing="lg" justify="center" cols={12} gutterXs={50} gutterMd={50} gutterXl={50}>
          {my_haikoos.map((haikoo, i) =>
            <Grid.Col key={i} xs={12} sm={6} md={4} lg={3} xl={3}>
              <Card padding="lg" radius="md" shadow="sm" withBorder>
                <Text weight={500} size="lg" mb="xs">{haikoo.title}</Text>
                <Text mb="md">{`"${haikoo.content}"`}</Text>
                <Text size="sm" color="gray">Technical Score: {haikoo.score}</Text>
                <Text size="sm" color="gray">Social Score: {haikoo.social_score}</Text>
              </Card>
            </Grid.Col>
          )}
        </Grid>
      </div>
      <Friends />
      <FavoriteHaikoos />
      <Footer1 />
    </div>
  );
};

export default UserView;
