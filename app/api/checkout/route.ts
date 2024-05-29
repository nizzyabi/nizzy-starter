import { auth } from "@/auth";
import { tiers, pricing } from "@/components/pricing-card";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { NextResponse, userAgent } from "next/server";
import Stripe from "stripe";

export async function POST(
    req: Request
    ){
        try {
            const user = await auth()
            
            if(!user || !user.user.id) {
                return new NextResponse("Unauthorized", { status: 401 });
            }

            const { price, name } = await req.json();


            const userSubscription = await db.userSubscription.findUnique({
                where: {
                    userId: user.user.id
                }
            })

            if (userSubscription && userSubscription.stripeCustomerId) {
                const stripeSession = await stripe.billingPortal.sessions.create({
                    customer: userSubscription.stripeCustomerId,
                    return_url: 'http://localhost:3000'
                })

                return new NextResponse(JSON.stringify({ url: stripeSession.url }))
            }

            const stripeSession = await stripe.checkout.sessions.create({
                success_url: 'http://localhost:3000/dashboard',
                cancel_url: 'http://localhost:3000/login',
                payment_method_types: ["card"],
                // you can change this
                mode: "subscription",
                billing_address_collection: "auto",
                customer_email: user?.user.email!,
                // options of items
                line_items: [
                    {
                        price_data: {
                            currency: "USD",
                            product_data: {
                                name: "Your SaaS Subscription Name",
                                description: "Saas Subscription Description"
                            },
                            // cost
                            unit_amount: price * 100,
                            // subscription
                            recurring: {
                                interval: "month",
                            }
                        },
                        quantity: 1,
                    }
                ],
                // meta data that gets read after user pays so that we know who payed. 
                metadata: {
                    userId: user.user.id
                }
            });
            // return the stripe session url
            return new NextResponse(JSON.stringify({ url: stripeSession.url}))
    
    
        } catch (error) {
            console.log("[STRIPE_GET]", error)
            return new NextResponse("Internal Error", { status: 500 })
        }
}