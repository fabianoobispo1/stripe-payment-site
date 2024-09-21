'use client';
import { useEffect, useState } from 'react';

export default function TotalVendas() {
  const [totalVendas, setTotalVendas] = useState<number | null>(null);

  useEffect(() => {
    const fetchVendas = async () => {
      const response = await fetch('/api/vendas');
      const data = await response.json();
      setTotalVendas(data.totalVendas);
    };

    fetchVendas();
  }, []);

  return (
    <div className='text-white'>
   
      {totalVendas !== null ? (
        <p>R$ {totalVendas}.00</p>
      ) : (
        <p>R$ 0.00</p>
      )}
    </div>
  );
}
