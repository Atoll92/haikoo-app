const functions = require('firebase-functions');
const admin = require('firebase-admin');
const stripe = require('stripe')('sk_test_51PomwV2KqNIKpvjTLJHgNKavSRbgvnyAZSFWdysCdn779Hdq2bvmJHw1dRqEsosZTN6aSz9evVOWXA7P5YlJFLMh00mraN0LnF'); // Replace with your Stripe secret key
const logger = require('firebase-functions/logger');
const express = require('express');
const app = express();

admin.initializeApp();
const db = admin.firestore();

// Middleware to preserve raw body for Stripe's signature verification
app.use(express.raw({ type: 'application/json' }));

app.post('/webhook', async (req, res) => {
    const rawBody = req.body;
    const stripeSignature = req.headers['stripe-signature'];
  
    let event;
  
    try {
      event = stripe.webhooks.constructEvent(
        rawBody,
        stripeSignature,
        'whsec_bb0b3ce98505714f553618ed2a78ad2747dafc04cd0922af34bbf69c8995500' // Replace with your actual webhook secret
      );
  
      logger.info('Received event', { eventType: event.type });
  
      if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object;
        const customerId = paymentIntent.customer;
  
        try {
          const customerRef = db.collection('customers').doc(customerId);
          const customerDoc = await customerRef.get();
  
          // Create or update the customer document
          const customerData = {
            paidMembership: true,
            lastPaymentIntentId: paymentIntent.id,
            lastPaymentAmount: paymentIntent.amount_received,
            lastPaymentTimestamp: admin.firestore.FieldValue.serverTimestamp(),
          };
  
          if (!customerDoc.exists) {
            await customerRef.set(customerData);
            logger.info('Customer document created', { customerId });
          } else {
            await customerRef.set(customerData, { merge: true });
            logger.info('Customer document updated', { customerId });
          }
  
          res.status(200).send('Success');
        } catch (err) {
          logger.error('Error updating Firestore', err);
          res.status(500).send('Error updating Firestore');
        }
      } else {
        logger.warn('Unhandled event type', { eventType: event.type });
        res.status(200).send('Unhandled event type'); // Respond with 200 OK to avoid retries
      }
    } catch (err) {
      logger.error('Webhook Error', err.message);
      res.status(400).send(`Webhook Error: ${err.message}`);
    }
  });
  
  exports.handleStripeWebhook = functions.https.onRequest(app);
