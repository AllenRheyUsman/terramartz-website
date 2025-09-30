Use this api/ folder only : If you’re integrating a third-party API directly from frontend.

For example : Third-Party APIs (Stripe, S3, etc.)

<!-- 'use server';

import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function createCheckoutSession(items: any[]) {
  const session = await stripe.checkout.sessions.create({
    line_items: items,
    mode: 'payment',
    success_url: 'http://localhost:3000/success',
    cancel_url: 'http://localhost:3000/cancel',
  });

  return session.url;
} -->
