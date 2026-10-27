"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { stripe } from "@/lib/stripe";

// 50 credits = $1.00 (100 cents), so cents = credits * 2
export async function createCheckoutSession(credits: number) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");
  if (!Number.isInteger(credits) || credits < 50 || credits > 1000) {
    throw new Error("Invalid credit amount");
  }

  const origin = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: credits * 2,
          product_data: { name: `${credits} credits` },
        },
      },
    ],
    metadata: { userId, credits: String(credits) },
    success_url: `${origin}/billing?success=1`,
    cancel_url: `${origin}/billing?canceled=1`,
  });

  if (!session.url) throw new Error("Could not start checkout");
  redirect(session.url);
}