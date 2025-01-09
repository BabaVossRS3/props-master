import express from 'express';
import Stripe from 'stripe';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: '../.env.local' });

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors({
 origin: 'http://localhost:5174'
}));

app.use(express.json());

app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { priceId, userId, userEmail, planName } = req.body;
    
    const successPath = planName === 'Boost' ? 'BoostListing' : 'BoostPlusListing';

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `http://localhost:5174/${successPath}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:5174/choosePlan`,
      customer_email: userEmail,
      metadata: { userId, planName }
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));