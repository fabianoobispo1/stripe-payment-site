import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
export async function POST(request: NextRequest) {
  try {

    // you can implement some basic check here like, is user valid or not
    console.log('api')
    const data = await request.json();
    console.log(data)
    //const priceId = data.priceId;
    const checkoutSession: Stripe.Checkout.Session =
      await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price: 'prod_QsrktTL7RxPMef',
            quantity: 1
          }
        ],
        mode: 'payment',
        success_url: `${process.env.NEXT_BASE_URL}/success`,
        cancel_url: `${process.env.NEXT_BASE_URL}/`,
       
      });
    return NextResponse.json({ result: checkoutSession, ok: true });
  } catch (error) {
    console.log(error);
    return new NextResponse('Internal Server', { status: 500 });
  }
}