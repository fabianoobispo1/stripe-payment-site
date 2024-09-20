'use client';

import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function Home() {
  const [amountCollected, setAmountCollected] = useState(0);
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

  return (
    <div className="container">
      <div className="header">
        <p>Valor arrecadado: R${(amountCollected / 100).toFixed(2)}</p>
      </div>
      <div className="main">
        <button role="link" onClick={handleClick} disabled={loading}>
          {loading ? 'Redirecionando...' : 'Pagar R$1,00 para clicar'}
        </button>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          height: 100vh;
          justify-content: center;
          align-items: center;
        }
        .header {
          position: absolute;
          top: 10px;
          right: 20px;
        }
        .main {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
        }
        button {
          padding: 10px 20px;
          font-size: 16px;
          background-color: #0070f3;
          color: white;
          border: none;
          cursor: pointer;
        }
        button:disabled {
          background-color: #999;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
