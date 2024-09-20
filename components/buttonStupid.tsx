'use client';
import { Button } from '@/components/ui/button';
import { useState } from 'react';



import { loadStripe } from '@stripe/stripe-js';

// A chave publicável deve ser usada aqui
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);


interface CheckoutButtonProps {
  items: { name: string; price: number; quantity: number }[];
}

export default function ButtonStupid() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    console.log(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
    setLoading(true);

    const stripe = await stripePromise;

    const response = await fetch('/api/checkout', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const { url } = await response.json();

    if (url) {
      stripe?.redirectToCheckout({ sessionId: url });
    } else {
      console.error('Error creating Stripe checkout session');
    }

    setLoading(false);
  };
  return <Button  disabled={loading} onClick={handleCheckout}>pague R$1 para clicar neste botão estúpido</Button>;
}
