import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export async function GET() {
  try {
    const charges = await stripe.charges.list();
    const total = charges.data.reduce((acc, charge) => acc + charge.amount, 0);
    return NextResponse.json({ total });
  } catch (error: unknown) {
    // Verificando se o erro é uma instância de Error
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
    }
  }
}