'use client';
import { Button } from '@/components/ui/button';
import { useState } from 'react';



import { loadStripe } from '@stripe/stripe-js';

// A chave publicável deve ser usada aqui
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);



export default function ButtonStupid() {
  const [loading, setLoading] = useState(false);

/*   const handleCheckout = async () => {
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
  }; */



  const handleClick = async () => {
    setLoading(true);

    try {
      const stripe = await stripePromise;

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const { id } = await response.json();

      // Redireciona para o Stripe Checkout
      const result = await stripe?.redirectToCheckout({ sessionId: id });

      if (result?.error) {
        console.error(result.error.message);
        alert('Erro ao redirecionar para o checkout do Stripe. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao criar sessão de checkout:', error);
      alert('Ocorreu um erro na conexão com o Stripe. Verifique sua conexão ou tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };




  return <Button  disabled={loading} onClick={handleClick}>pague R$1 para clicar neste botão estúpido</Button>;
}
