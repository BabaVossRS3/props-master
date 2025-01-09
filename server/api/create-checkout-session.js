import express from 'express';
import Stripe from 'stripe';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_TEST_KEY);

router.post('/create-checkout-session', async (req, res) => {
  try {
    const { priceId, userId, userEmail, planName } = req.body;

    if (!priceId || !userId || !userEmail || !planName) {
      return res.status(400).json({ 
        error: 'Missing required fields' 
      });
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.VITE_APP_URL}/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.VITE_APP_URL}/choose-plan`,
      customer_email: userEmail,
      metadata: {
        userId,
        planName,
      },
    });

    res.status(200).json({ 
      sessionId: session.id 
    });
  } catch (error) {
    console.error('Checkout session error:', error);
    res.status(500).json({ 
      error: error.message 
    });
  }
});

export default router;