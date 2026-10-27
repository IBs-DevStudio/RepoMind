import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type Stripe from "stripe";

import { stripe } from "@/lib/stripe";
import { db } from "@/server/db";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = await req.text(); // raw body is required for signature checks
  const signature = (await headers()).get("stripe-signature");
  if (!signature) return NextResponse.json({ error: "No signature" }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const userId = session.metadata?.userId;
    const credits = Number(session.metadata?.credits);

    if (session.payment_status === "paid" && userId && credits > 0) {
      await db.creditEntry.upsert({
        where: { stripeSessionId: session.id },
        update: {},
        create: {
          userId,
          delta: credits,
          reason: "PURCHASE",
          stripeSessionId: session.id,
        },
      });
    }
  }

  return NextResponse.json({ received: true });
}