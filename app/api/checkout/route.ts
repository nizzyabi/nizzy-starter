import { auth } from '@/auth'
import { db } from '@/lib/db'
import { stripe } from '@/lib/stripe'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const user = await auth()

    if (!user || !user.user.id) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const userSubscription = await db.userSubscription.findUnique({
      where: {
        userId: user.user.id
      }
    })

    if (userSubscription && userSubscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: process.env.APP_URL
      })

      return new NextResponse(JSON.stringify({ url: stripeSession.url }))
    }

    const stripeSession = await stripe.checkout.sessions.create({
      success_url: process.env.APP_URL,
      cancel_url: process.env.APP_URL,
      payment_method_types: ['card'],

      mode: 'subscription',
      billing_address_collection: 'auto',
      customer_email: user?.user.email!,

      line_items: [
        {
          price_data: {
            currency: 'USD',
            product_data: {
              name: 'Your SaaS Subscription Name',
              description: 'Saas Subscription Description'
            },
            // cost (change this to the price of your product)
            unit_amount: 899,
            recurring: {
              interval: 'month'
            }
          },
          quantity: 1
        }
      ],
      metadata: {
        userId: user.user.id
      }
    })
    return new NextResponse(JSON.stringify({ url: stripeSession.url }))
  } catch (error) {
    console.log('[STRIPE_GET]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
