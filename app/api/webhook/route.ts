import Stripe from 'stripe'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { stripe } from '@/lib/stripe'

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get('Stripe-Signature') as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
  }

  const session = event.data.object as Stripe.Checkout.Session

  // checkout.session.completed is sent after the initial purchase of the subscription from the checkout page
  if (event.type === 'checkout.session.completed') {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    )
    if (!session?.metadata?.userId) {
      return new NextResponse('No user id found', { status: 400 })
    }

    await db.userSubscription.create({
      data: {
        userId: session.metadata.userId,
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000)
      }
    })
  }

  // invoice.payment_succeeded is sent on subscription renewals
  if (event.type === "invoice.payment_succeeded") {
    // note: sometimes the subscription we get back doesn't have the up to date current_period_end
    // which is why we also need to listen for customer.subscription.updated
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    const subscriptionId = subscription.id;

    await db.userSubscription.update({
      where: {
        stripeSubscriptionId: subscription.id
      },
      data: {
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000)
      }
    })
  }

  // customer.subscription.updated is fired when their subscription end date changes
  if (event.type === 'customer.subscription.updated') {
    const subscriptionId = event.data.object.id as string;

    await db.userSubscription.update({
      where: {
        stripeSubscriptionId: subscription.id
      },
      data: {
        stripeCurrentPeriodEnd: new Date(event.data.object.current_period_end * 1000)
      }
    })
  }

  // invoice.payment_failed if the renewal fails
  if (event.type === 'invoice.payment_failed') {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    )

    await db.userSubscription.update({
      where: {
        stripeSubscriptionId: subscription.id
      },
      data: {
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000)
      }
    })
  }

  return new NextResponse(null, { status: 200 })
}
