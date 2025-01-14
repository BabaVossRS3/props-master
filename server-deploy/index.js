
import express from 'express';
import Stripe from 'stripe';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { db } from './../configs/db.js';
import { UserPlan } from './../configs/schema.js';

dotenv.config({ path: '../.env.local' });

const app = express();
const stripe = new Stripe(process.env.STRIPE_LIVE_SECRET_KEY); // Changed to live key

// Update CORS for your Hostinger domain
app.use(cors({
  origin: ['https://jrsportfolio.io', 'http://localhost:5173'], // Add your actual domain
  methods: ['GET', 'POST'],
  credentials: true,
}));

app.use(express.json());

app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { priceId, userId, userEmail, planName } = req.body;
    
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.FRONTEND_URL}/subscription-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/choosePlan`,
      customer_email: userEmail,
      metadata: { userId, planName },
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/verify-subscription', async (req, res) => {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    try {
      const { sessionId } = req.body;
  
      if (!sessionId) {
        return res.status(400).json({ success: false, error: 'Session ID is missing' });
      }
  
      console.log('Session ID received:', sessionId);
  
      // Retrieve the checkout session from Stripe
      const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['subscription'],
      });
  
      console.log('Session retrieved:', session);
  
      if (session.payment_status === 'paid') {
        const planType = session.metadata.planName;
        const userId = session.metadata.userId;
  
        console.log('Plan Type:', planType);
        console.log('User ID:', userId);
  
        // Update or insert the user's plan in the database
        await db.insert(UserPlan).values({
          userId: userId,
          plan: planType,
          startDate: new Date(),
          isActive: true,
        }).onConflictDoUpdate({
          target: [UserPlan.userId],
          set: {
            plan: planType,
            startDate: new Date(),
            isActive: true,
          },
        });
  
        // Return success response with plan type
        res.json({
          success: true,
          planType: planType,
        });
      } else {
        throw new Error('Payment not completed');
      }
    } catch (error) {
      console.error('Error verifying subscription:', error);
      res.status(500).json({
        success: false,
        error: error.message || 'An unexpected error occurred',
      });
    }
  });
  

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});