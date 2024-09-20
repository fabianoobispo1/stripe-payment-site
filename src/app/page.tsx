'use client';

/* import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
 */

/* const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!); */

export default function HomePage() {
  /* const [amountCollected, setAmountCollected] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Carregar o valor arrecadado (simulação)
    fetch('/api/get-total-amount')
      .then((res) => res.json())
      .then((data) => setAmountCollected(data.total));
  }, []);

  const handleClick = async () => {
    setLoading(true);

    try {
      const stripe = await stripePromise;

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',       
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: 'test'}),
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
  }; */

  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      a
    </div>
    
  

    
  );
}
