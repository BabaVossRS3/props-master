import Stripe from 'stripe';
import { db } from '../../db/index.js';
import { UserPlan } from '../../db/schema.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_TEST_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { sessionId } = req.body;

    // Retrieve the checkout session
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['subscription']
    });

    if (session.payment_status === 'paid') {
      // Get the plan type from metadata
      const planType = session.metadata.planName;
      const userId = session.metadata.userId;

      // Update the user's plan in your database
      await db.insert(UserPlan).values({
        userId: userId,
        plan: planType,
        startDate: new Date(),
        isActive: true
      }).onConflictDoUpdate({
        target: [UserPlan.userId],
        set: {
          plan: planType,
          startDate: new Date(),
          isActive: true
        }
      });

      // Return success with plan type
      res.json({
        success: true,
        planType: planType
      });
    } else {
      throw new Error('Payment not completed');
    }
  } catch (error) {
    console.error('Error verifying subscription:', error);
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
}