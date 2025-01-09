import Stripe from 'stripe';
import { db } from '../db/db';
import { eq } from 'drizzle-orm';
import { users, subscriptions } from '../db/schema';

const stripe = new Stripe(process.env.STRIPE_SECRET_TEST_KEY);

export async function POST(req) {
  try {
    const { planName, userId, email } = await req.json();

    // Get price ID based on plan
    const priceId = planName === 'Boost' ? 'price_boost_monthly' : 'price_boostplus_monthly';

    // Create or get customer
    let customer = await stripe.customers.list({ email });
    if (customer.data.length === 0) {
      customer = await stripe.customers.create({
        email,
        metadata: {
          userId,
        },
      });
    } else {
      customer = customer.data[0];
    }

    // Create subscription
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
    });

    // Store subscription info in database
    await db.insert(subscriptions).values({
      userId,
      stripeSubscriptionId: subscription.id,
      stripePriceId: priceId,
      stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
    });

    return new Response(JSON.stringify({
      subscriptionId: subscription.id,
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
    }));
  } catch (error) {
    console.error('Error creating subscription:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}


