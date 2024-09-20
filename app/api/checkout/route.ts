import { NextRequest, NextResponse } from "next/server";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function GET(req: Request) {
 
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: 'prod_QsrktTL7RxPMef',
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${process.env.NEXTAUTH_URL}/?success=true`,
        cancel_url: `${process.env.NEXTAUTH_URL}/?canceled=true`,
      });
      return NextResponse.json({ url: session.url });
    } catch (err: any) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }

  }
