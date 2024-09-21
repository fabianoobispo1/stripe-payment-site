import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-06-20'
});

export async function GET(request: Request) {
  try {
    // Listar PaymentIntents
    const paymentIntents = await stripe.paymentIntents.list({
      limit: 100
    });

    let totalVendas = 0;

    // Filtrar PaymentIntents cujo status é 'succeeded'
    const successfulPaymentIntents = paymentIntents.data.filter(
      (intent) => intent.status === 'succeeded'
    );

    for (const paymentIntent of successfulPaymentIntents) {
      console.log(paymentIntent);

      totalVendas += 1;
    }

    // Retornar a quantidade de vendas
    return NextResponse.json({ totalVendas });
  } catch (error) {
    console.error('Erro ao recuperar vendas:', error);
    return NextResponse.json(
      { error: 'Erro ao recuperar vendas' },
      { status: 500 }
    );
  }
}
